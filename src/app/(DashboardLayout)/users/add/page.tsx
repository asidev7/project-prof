'use client';
import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import './AddUser.css'
interface FormData {
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  telephone: string;
  adresse: string;
  date_naissance: string;
  lieu_naissance: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
}

const UserAddUser = () => {
  const initialFormData: FormData = {
    nom: '',
    prenom: '',
    email: '',
    username: '',
    role: '',
    telephone: '',
    adresse: '',
    date_naissance: '',
    lieu_naissance: '',
    password: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include', // Pour inclure les cookies si nécessaire
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.roles) {
          setRoles(data.roles);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des rôles. Veuillez réessayer.');
        console.error('Erreur fetch roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    // Validation du nom
    if (formData.nom.length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    
    // Validation du prénom
    if (formData.prenom.length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Veuillez entrer une adresse email valide';
    }
    
    // Validation du numéro de téléphone
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(formData.telephone)) {
      errors.telephone = 'Veuillez entrer un numéro de téléphone valide';
    }
    
    // Validation du mot de passe
    if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur de validation pour ce champ
    setValidationErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du formulaire
    if (!validateForm()) {
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Pour inclure les cookies si nécessaire
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data?.success) {
        setMessage('Utilisateur ajouté avec succès!');
        setFormData(initialFormData); // Réinitialiser le formulaire
      } else {
        throw new Error(data?.message || 'Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-blue-700 font-bold text-2xl">Ajouter un Utilisateur</h1>
        </div>

        {message && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-1">
              {key === 'role' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-blue-400 rounded focus:outline-none focus:border-blue-600"
                >
                  <option value="">Sélectionner un rôle</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === 'password' ? 'password' : key === 'email' ? 'email' : key === 'date_naissance' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  required
                  className="w-full p-3 border border-blue-400 rounded focus:outline-none focus:border-blue-600"
                />
              )}
              {validationErrors[key as keyof FormData] && (
                <p className="text-red-500 text-sm">{validationErrors[key as keyof FormData]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Chargement...' : (
              <>
                <FaSave />
                <span>Ajouter Utilisateur</span>
              </>
            )}
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default UserAddUser;