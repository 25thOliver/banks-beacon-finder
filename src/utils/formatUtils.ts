
export const formatContactInfo = (contactInfo?: any): string => {
  if (!contactInfo || typeof contactInfo !== "object") return "No contact info available";

  const contactParts = [contactInfo.phone1, contactInfo.phone2, contactInfo.email]
    .filter((val) => val && val.trim() !== "");

  return contactParts.length ? contactParts.join(" / ") : "No contact info available";
};

export const highlightMatch = (text: string, searchTerm: string): string => {
  if (!searchTerm || searchTerm.length < 2) return text;
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
};
