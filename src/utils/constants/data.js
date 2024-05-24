import report from "/assets/svg/sidebar/report.svg"
import mission from "/assets/svg/sidebar/mission.svg"
import user from "/assets/svg/sidebar/user.svg"
import content from "/assets/svg/sidebar/content.svg"
import admin from "/assets/svg/sidebar/admin.svg"
import achievment from "/assets/svg/sidebar/achievment.svg"
import openai from "/assets/svg/sidebar/openai.svg"

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
    name: "Manajemen Pelaporan",
    url: "/report",
    iconActive: reportWhite,
    icon: report,
  },
  {
    name: "Manajemen Misi",
    url: "/mission",
    iconActive: missionWhite,
    icon: mission,
  },
  {
    name: "Manajemen Konten",
    url: "/content",
    iconActive: contentWhite,
    icon: content,
  },
  {
    name: "Manajemen Pengguna",
    url: "/user",
    iconActive: userWhite,
    icon: user,
  },
  {
    name: "Manajemen Admin",
    url: "/admin",
    iconActive: adminWhite,
    icon: admin,
  },
  {
    name: "Manajemen Penacapaian",
    url: "/achievment",
    iconActive: achievmentWhite,
    icon: achievment,
  },
  {
    name: "Manajemen OpenAI",
    url: "/openai",
    iconActive: openaiWhite,
    icon: openai,
  },
]