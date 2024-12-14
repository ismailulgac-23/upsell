import { API_URL } from "./axios"

export const socialLinks = {
   "logos:instagram-icon": "Instagram",
   "logos:linkedin-icon": "Linkedin",
   "lets-icons:e-mail": "Mail",
   "logos:facebook": "Facebook",
   "pajamas:twitter": "Twitter"
}

export const getImage = (folder, src) => `${API_URL}/uploads/${folder}/${src}`;
export const formatDate = (dateString) => {
   const date = new Date(dateString);

   const day = date.getDate();
   const month = date.toLocaleString('tr-TR', { month: 'long' });
   const year = date.getFullYear();

   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');

   const formattedDate = `${day} ${month} ${year}`;
   const formattedTime = `${hours}:${minutes}`;

   return [formattedDate, formattedTime];
}

export const GENDERS = {
   MALE: "Erkek",
   FEMALE: "Kadın",
}

export const getAgeFromDate = (payload) => {
   const birthDate = new Date(payload);
   const today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();

   if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
   ) {
      age--;
   }

   return age.toString();
}