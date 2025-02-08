
export const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';



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

    // Stockage du token JWT dans localStorage (ou vous pouvez utiliser un cookie ici)
    localStorage.setItem('token', result.token);

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
}

const getUserProfile = async () => {
  const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));

  if (!csrfToken) {
    console.error('CSRF token not found');
    return;
  }

  try {
    const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/user-profile/', {
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


const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token"); // Récupération du token JWT

    if (!token) {
      throw new Error("Aucun token trouvé, vous êtes déjà déconnecté.");
    }

    const response = await fetch(`${API_BASE_URL}/utilisateurs/logout/`, {
      method: "POST",
      credentials: "include", // Nécessaire si l'authentification utilise des cookies
      headers: {
        Authorization: `Bearer ${token}`, // Envoi du token JWT dans le header Authorization
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la déconnexion");
    }

    // Suppression du token du localStorage
    localStorage.removeItem("token");

    // Rediriger l'utilisateur vers la page de connexion après la déconnexion
    window.location.href = "/auth/login"; // Ou utilisez `router.push("/login")` pour Next.js

  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
};


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
