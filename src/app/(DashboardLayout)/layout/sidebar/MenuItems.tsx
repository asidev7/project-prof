import {
  IconUsers,
  IconUserPlus,
  IconLock,
  IconSettings,
  IconUserCheck,
  IconListDetails,
  IconClock,
  IconActivity,
  IconBuildingCommunity,
  IconKey,
  IconLogin,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
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
];

export default Menuitems;
