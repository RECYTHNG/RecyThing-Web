import report from "/assets/svg/sidebar/report.svg"
import mission from "/assets/svg/sidebar/mission.svg"
import user from "/assets/svg/sidebar/user.svg"
import content from "/assets/svg/sidebar/content.svg"
import admin from "/assets/svg/sidebar/admin.svg"
import achievment from "/assets/svg/sidebar/achievment.svg"
import openai from "/assets/svg/sidebar/openai.svg"
import missionList from "/assets/svg/sidebar/missionList.svg"
import missionApproval from "/assets/svg/sidebar/missionApproval.svg"

// Hover
import reportWhite from "/assets/svg/sidebar/reportWhite.svg"
import missionWhite from "/assets/svg/sidebar/missionWhite.svg"
import userWhite from "/assets/svg/sidebar/userWhite.svg"
import contentWhite from "/assets/svg/sidebar/contentWhite.svg"
import adminWhite from "/assets/svg/sidebar/adminWhite.svg"
import achievmentWhite from "/assets/svg/sidebar/achievmentWhite.svg"
import openaiWhite from "/assets/svg/sidebar/openaiWhite.svg"

export const nav_item = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    iconActive: missionWhite,
    icon: mission,
  },
  {
    name: "Manajemen Pelaporan",
    url: "/admin/report",
    iconActive: reportWhite,
    icon: report,
  },
  {
    name: "Manajemen Misi",
    iconActive: missionWhite,
    url: "/admin/mission",
    icon: mission,
    children: [
      {
        name: "Daftar Misi",
        url: "/admin/mission/list",
        icon: missionList,
      },
      {
        name: "Persetujuan Misi",
        url: "/admin/mission/approval",
        icon: missionApproval,
      },
    ]
  },
  {
    name: "Manajemen Konten",
    url: "/admin/content",
    iconActive: contentWhite,
    icon: content,
  },
  {
    name: "Manajemen Pengguna",
    url: "/admin/user",
    iconActive: userWhite,
    icon: user,
  },
  {
    name: "Manajemen Admin",
    url: "/admin/admin",
    iconActive: adminWhite,
    icon: admin,
  },
  {
    name: "Manajemen Pencapaian",
    url: "/admin/achievement",
    iconActive: achievmentWhite,
    icon: achievment,
  },
  {
    name: "Manajemen OpenAI",
    url: "/admin/openai",
    iconActive: openaiWhite,
    icon: openai,
  },
]