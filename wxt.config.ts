import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "LinkedIn AI Reply",
    permissions: ["activeTab", "downloads", "scripting", "storage"],
    action: {},
    host_permissions: ["*://*/*"],
  },
  runner: {
    startUrls: ["https://linkedin.com"],
  },
});
