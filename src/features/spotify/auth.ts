import { SpotifyUserProfile } from "@/types";
import { generateCodeChallenge, generateRandomString } from "./pkce";

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-private",
];

const STORAGE_KEYS = {
  VERIFIER: "echoflow_pkce_verifier",
  STATE: "echoflow_pkce_state",
  ACCESS_TOKEN: "echoflow_spotify_access_token",
  REFRESH_TOKEN: "echoflow_spotify_refresh_token",
  EXPIRES_AT: "echoflow_spotify_expires_at",
  USER_PROFILE: "echoflow_spotify_user_profile",
};

export function getSpotifyClientId(): string {
  return process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
}

export function getSpotifyRedirectUri(): string {
  if (typeof window !== "undefined") {
    return (
      process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ||
      `${window.location.origin}/callback`
    );
  }
  return process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "http://localhost:3000/callback";
}

/**
 * Initiates Spotify OAuth 2.0 PKCE Authorization
 */
export async function redirectToSpotifyAuth(): Promise<void> {
  const clientId = getSpotifyClientId();
  if (!clientId) {
    throw new Error(
      "Spotify Client ID is missing. Please configure NEXT_PUBLIC_SPOTIFY_CLIENT_ID in .env.local or use Demo Mode."
    );
  }

  const verifier = generateRandomString(64);
  const state = generateRandomString(32);
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem(STORAGE_KEYS.VERIFIER, verifier);
  sessionStorage.setItem(STORAGE_KEYS.STATE, state);

  const redirectUri = getSpotifyRedirectUri();

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    scope: SCOPES.join(" "),
  });

  window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
}

/**
 * Handles the OAuth redirect callback, validates state, and exchanges code for access token.
 */
export async function handleSpotifyCallback(
  code: string,
  returnedState: string
): Promise<{ accessToken: string }> {
  const savedState = sessionStorage.getItem(STORAGE_KEYS.STATE);
  const verifier = sessionStorage.getItem(STORAGE_KEYS.VERIFIER);

  if (!savedState || !verifier || returnedState !== savedState) {
    throw new Error("Invalid OAuth state validation. Please try connecting again.");
  }

  const clientId = getSpotifyClientId();
  const redirectUri = getSpotifyRedirectUri();

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error_description ||
        `Spotify token exchange failed (${response.status}). Please try again.`
    );
  }

  const data = await response.json();
  const expiresAt = Date.now() + (data.expires_in || 3600) * 1000;

  sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
  if (data.refresh_token) {
    sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
  }
  sessionStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());

  // Clean up temporary PKCE values
  sessionStorage.removeItem(STORAGE_KEYS.VERIFIER);
  sessionStorage.removeItem(STORAGE_KEYS.STATE);

  return { accessToken: data.access_token };
}

/**
 * Returns current access token if valid
 */
export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const expiresAt = sessionStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

  if (!token || !expiresAt) return null;

  // If expired, return null
  if (Date.now() > parseInt(expiresAt, 10)) {
    return null;
  }

  return token;
}

/**
 * Saves authenticated user profile to session
 */
export function setStoredUserProfile(profile: SpotifyUserProfile): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

/**
 * Retrieves authenticated user profile from session
 */
export function getStoredUserProfile(): SpotifyUserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SpotifyUserProfile;
  } catch {
    return null;
  }
}

/**
 * Disconnects Spotify session and purges local storage
 */
export function disconnectSpotify(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => sessionStorage.removeItem(key));
}
