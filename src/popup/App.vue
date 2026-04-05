<script setup lang="ts">
const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

const getOuterHTMLInTab = async (tabId: number) => {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => document.documentElement.outerHTML,
    });

    if (!result || !result.result) {
      throw new Error("No result from script execution.");
    }

    return result.result;
  } catch (error) {
    console.error("Failed to access tab content:", error);
    throw error;
  }
};

const copyToClipboard = async () => {
  // --- Get Current Tab ---

  const tab = await getCurrentTab();

  if (!tab || !tab.id) {
    console.error("Failed to get current tab.");
    throw new Error("Failed to get current tab.");
  }

  // --- Get Outer HTML in Current Tab ---

  const outerHTML = await getOuterHTMLInTab(tab.id);

  // TODO: Process the outerHTML into a more readable format before copying to clipboard
  navigator.clipboard.writeText(outerHTML);
};
</script>

<template>
  <h1>Read-y</h1>
  <p>Click to copy the document in the current tab to clipboard.</p>
  <button @click="copyToClipboard">Copy</button>

  <!-- TODO: Add feedback to the user after copying -->
</template>

<style scoped></style>
