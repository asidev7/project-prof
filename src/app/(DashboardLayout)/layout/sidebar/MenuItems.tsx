import {
  IconLayoutDashboard,
  IconUsers,
  IconUserPlus,
  IconLock,
  IconSettings,
  IconListDetails,
  IconClock,
  IconActivity,
  IconBuildingCommunity,
  IconKey,
  IconLogin,
  IconFileAnalytics,
  IconMessage,
  IconFolder,
  IconShield,
  IconChartHistogram,
  IconRobot,
  IconAlertCircle,
  IconMail,
  IconPassword,
  IconHierarchy,
  IconArchive,
  IconCategory,
  IconFolderPlus,
  IconUpload,
  IconNews,
  IconChecklist,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Tableau de bord",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },

  {
    navlabel: true,
    subheader: "Utilisateurs",
  },

  {
    id: uniqueId(),
    title: "Liste des utilisateurs",
    icon: IconUsers,
    href: "/users/list",
  },

  {
    id: uniqueId(),
    title: "Ajouter un utilisateur",
    icon: IconUserPlus,
    href: "/users/add",
  },
  {
    id: uniqueId(),
    title: "Rôles",
    icon: IconKey,
    href: "/users/roles",
  },
  {
    id: uniqueId(),
    title: "Permissions",
    icon: IconLock,
    href: "/users/permissions",
  },
  {
    id: uniqueId(),
    title: "Historique des activités",
    icon: IconClock,
    href: "/users/activity",
  },
  {
    navlabel: true,
    subheader: "Groupes",
  },
  {
    id: uniqueId(),
    title: "Liste des groupes",
    icon: IconBuildingCommunity,
    href: "/groups/list",
  },
  {
    id: uniqueId(),
    title: "Ajouter un groupe",
    icon: IconUserPlus,
    href: "/groups/add",
  },
  {
    id: uniqueId(),
    title: "Membres et permissions",
    icon: IconListDetails,
    href: "/groups/members",
  },
  {
    id: uniqueId(),
    title: "Activités récentes",
    icon: IconActivity,
    href: "/groups/activity",
  },

  {
    navlabel: true,
    subheader: "Services",
  },
  {
    id: uniqueId(),
    title: "Liste des services",
    icon: IconListDetails,
    href: "/services/list",
  },
  {
    id: uniqueId(),
    title: "Ajouter un service",
    icon: IconUserPlus,
    href: "/services/add",
  },
  {
    id: uniqueId(),
    title: "Historique des services",
    icon: IconClock,
    href: "/services/history",
  },

  {
    navlabel: true,
    subheader: "Sécurité",
  },
  {
    id: uniqueId(),
    title: "Sessions actives",
    icon: IconLogin,
    href: "/security/sessions",
  },
  {
    id: uniqueId(),
    title: "Audit des connexions",
    icon: IconClock,
    href: "/security/audit",
  },
  {
    id: uniqueId(),
    title: "Préférences utilisateur",
    icon: IconSettings,
    href: "/security/preferences",
  },
  {
    id: uniqueId(),
    title: "Paramètres",
    icon: IconSettings,
    href: "/security/settings",
  },

  {
    navlabel: true,
    subheader: "Documents",
  },
  {
    id: uniqueId(),
    title: "Liste des documents",
    icon: IconFileAnalytics,
    href: "/documents/list",
    subtitle: "Documents actifs et archivés",
  },

   {
    id: uniqueId(),
    title: "Média partagé",
    icon: IconFileAnalytics,
    href: "/documents/media",
    subtitle: "Les médias partagés",
  },

 {
    id: uniqueId(),
    title: "Pages",
    icon: IconFileAnalytics,
    href: "/documents/pages",
    subtitle: "Documents actifs et archivés",
  },
  {
    id: uniqueId(),
    title: "Médias",
    icon: IconFolder,
    href: "/media/list",
    subtitle: "Images, vidéos et fichiers multimédias",
  },
  {
    id: uniqueId(),
    title: "Versions",
    icon: IconClock,
    href: "/documents/versions",
    subtitle: "Historique des modifications",
  },
  {
    id: uniqueId(),
    title: "Audit",
    icon: IconAlertCircle,
    href: "/documents/audit",
    subtitle: "Historique des modifications",
  },
  {
    id: uniqueId(),
    title: "Catégorie Document",
    icon: IconCategory,
    href: "/documents/category",
    subtitle: "Ajout de catégorie de document",
  },
  {
    id: uniqueId(),
    title: "Dossier",
    icon: IconFolderPlus,
    href: "/documents/dossier",
    subtitle: "Ajout dossier",
  },
  {
    id: uniqueId(),
    title: "Ajouter un document",
    icon: IconUpload,
    href: "/documents/import",
    subtitle: "Ajout des documents",
  },
  {
    id: uniqueId(),
    title: "Documents archivés",
    icon: IconArchive,
    href: "/documents/archived",
    subtitle: "Ajout des documents",
  },

  {
    navlabel: true,
    subheader: "Communication",
  },
  {
    id: uniqueId(),
    title: "Messagerie",
    icon: IconMessage,
    href: "/communication/messages",
    subtitle: "Conversations et discussions",
  },
  {
    id: uniqueId(),
    title: "Publications",
    icon: IconNews,
    href: "/communication/publications",
    subtitle: "Actualités et annonces",
  },
  {
    id: uniqueId(),
    title: "Sondages",
    icon: IconChartHistogram,
    href: "/communication/polls",
    subtitle: "Création et résultats",
  },

  {
    navlabel: true,
    subheader: "Sécurité Avancée",
  },
  {
    id: uniqueId(),
    title: "Journal d'activité",
    icon: IconAlertCircle,
    href: "/security/access-logs",
    subtitle: "Suivi des connexions",
  },
  {
    id: uniqueId(),
    title: "Contrôle IP",
    icon: IconShield,
    href: "/security/ip-control",
    subtitle: "Liste noire des adresses",
  },
  {
    id: uniqueId(),
    title: "2FA & Authentification",
    icon: IconPassword,
    href: "/security/authentication",
    subtitle: "Double authentification",
  },

  {
    navlabel: true,
    subheader: "Workflows",
  },
  {
    id: uniqueId(),
    title: "Processus métier",
    icon: IconChartHistogram,
    href: "/workflows/list",
    subtitle: "Gestion des flux de travail",
  },
  {
    id: uniqueId(),
    title: "Tâches assignées",
    icon: IconChecklist,
    href: "/workflows/tasks",
    subtitle: "Suivi des actions en cours",
  },
  {
    id: uniqueId(),
    title: "Statistiques",
    icon: IconReportAnalytics,
    href: "/workflows/stats",
    subtitle: "Performances des processus",
  },

  {
    navlabel: true,
    subheader: "Administration",
  },
  {
    id: uniqueId(),
    title: "Rôles & Permissions",
    icon: IconKey,
    href: "/admin/roles",
    subtitle: "Gestion des accès",
  },
  {
    id: uniqueId(),
    title: "Organigramme",
    icon: IconHierarchy,
    href: "/admin/organization",
    subtitle: "Structure hiérarchique",
  },
  {
    id: uniqueId(),
    title: "Rapports système",
    icon: IconFileAnalytics,
    href: "/admin/reports",
    subtitle: "Export des données",
  },
];

export default Menuitems;