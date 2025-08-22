// EmailJS placeholder config. Replace with your real values.
// You can keep them here for now; no need to touch .env.
export const emailConfig = {
  serviceId: "service_yo9zedq",
  templateId: "template_84tul76",
  publicKey: "9GBLkytOUdjH2DLDs",
};

export const hasEmailKeys = () =>
  emailConfig.serviceId && !emailConfig.serviceId.startsWith("YOUR_") &&
  emailConfig.templateId && !emailConfig.templateId.startsWith("YOUR_") &&
  emailConfig.publicKey && !emailConfig.publicKey.startsWith("YOUR_");