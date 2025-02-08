'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Box, Card, Stack, Typography, Button, TextField, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { signupUser } from '@/services/auth'; // Importer la fonction signupUser

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
    password: '',
    role: 'user',
    telephone: '',
    adresse_physique: '',
    date_naissance: '',
    lieu_naissance: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Vérifier que tous les champs sont remplis
    if (
      !userDetails.nom ||
      !userDetails.prenom ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.username ||
      !userDetails.telephone ||
      !userDetails.adresse_physique ||
      !userDetails.date_naissance ||
      !userDetails.lieu_naissance
    ) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await signupUser({
        nom: userDetails.nom,
        prenom: userDetails.prenom,
        email: userDetails.email,
        username: userDetails.username,
        role: userDetails.role,
        telephone: userDetails.telephone,
        adresse_physique: userDetails.adresse_physique,
        date_naissance: userDetails.date_naissance,
        lieu_naissance: userDetails.lieu_naissance,
        password: userDetails.password
      });

      if (response.success) {
        setSuccess('Inscription réussie !');
        router.push('/auth/login'); // Redirige vers la page de connexion après inscription
      } else {
        setError(response.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Inscription" description="Page d'inscription LNB">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/login.png"
                alt="Image promotionnelle LNB"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "15px" }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px", borderRadius: "15px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                <Image src="/images/logo.svg" alt="Logo LNB" width={100} height={100} />
              </Box>
              <Typography
                variant="h4"
                fontWeight="700"
                textAlign="center"
                mb={2}
                sx={{ color: "#007554" }}
              >
                LNB INTRANET
              </Typography>
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={4}>
                Créez un compte pour accéder à l&apos;intranet
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Nom"
                    placeholder="Entrez votre nom"
                    fullWidth
                    required
                    name="nom"
                    value={userDetails.nom}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Prénom"
                    placeholder="Entrez votre prénom"
                    fullWidth
                    required
                    name="prenom"
                    value={userDetails.prenom}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Nom d'utilisateur"
                    placeholder="Entrez votre nom d'utilisateur"
                    fullWidth
                    required
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Adresse Email"
                    placeholder="Entrez votre email"
                    fullWidth
                    required
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    type="password"
                    fullWidth
                    required
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Téléphone"
                    placeholder="Entrez votre téléphone"
                    fullWidth
                    required
                    name="telephone"
                    value={userDetails.telephone}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Adresse Physique"
                    placeholder="Entrez votre adresse"
                    fullWidth
                    required
                    name="adresse_physique"
                    value={userDetails.adresse_physique}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Date de naissance"
                    placeholder="Entrez votre date de naissance"
                    fullWidth
                    required
                    name="date_naissance"
                    value={userDetails.date_naissance}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Lieu de naissance"
                    placeholder="Entrez votre lieu de naissance"
                    fullWidth
                    required
                    name="lieu_naissance"
                    value={userDetails.lieu_naissance}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#007554",
                      color: "#FFFFFF",
                      transition: "transform 0.2s ease-in-out",
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Inscription...' : 'S&apos;inscrire'}
                  </Button>
                </Stack>
              </form>

              <Typography
                variant="body2"
                textAlign="center"
                color="textSecondary"
                mt={3}
              >
                Vous avez déjà un compte ?{' '}
                <Link href="/login" passHref>
                  <Typography
                    sx={{
                      textDecoration: "none",
                      color: "#007554",
                      cursor: "pointer",
                      display: "inline",
                    }}
                  >
                    Connectez-vous
                  </Typography>
                </Link>
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                color="textSecondary"
                mt={3}
              >
                Les lots aux gagnants, les bénéfices à toute la nation.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register;
