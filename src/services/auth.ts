export const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

// Fonction de connexion de l'utilisateur
export async function loginUser(credentials: { identifier: string; password: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/connexion/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Identifiants incorrects.');
    }

    // Stockage du token JWT dans localStorage
    localStorage.setItem('token', result.token);

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
}

// Récupérer le profil utilisateur
const getUserProfile = async () => {
  const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));

  if (!csrfToken) {
    console.error('CSRF token not found');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/user-profile/`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-CSRFTOKEN': csrfToken.split('=')[1]  // Récupérer le token depuis les cookies
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User profile data:', data);
    } else {
      console.error('Error fetching user profile:', response.statusText);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
};

getUserProfile();

// Déconnexion de l'utilisateur
const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Aucun token trouvé, vous êtes déjà déconnecté.");
    }

    const response = await fetch(`${API_BASE_URL}/utilisateurs/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la déconnexion");
    }

    // Suppression du token du localStorage
    localStorage.removeItem("token");

    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "/auth/login";

  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
};

// Fonction d'inscription
export async function signupUser(userDetails: { nom: string; prenom: string; email: string; password: string; username: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/inscription/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur d\'inscription.');
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Activer la vérification en deux étapes
export async function activate2FA(userDetails: { user_id: number; email: string; otp_code: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/activate-2fa/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur d\'activation de la vérification en deux étapes.');
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Envoyer un code OTP
export async function sendOTPCode(userDetails: { user_id: number }) {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/send-otp-code/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de l\'envoi du code OTP.');
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Demander la réinitialisation du mot de passe
export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/password/forgot_password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de la demande de réinitialisation du mot de passe.');
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Mettre à jour le mot de passe
export async function updatePassword(uid: string, token: string, newPassword: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/password/update_password/${uid}/${token}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de la mise à jour du mot de passe.');
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}
