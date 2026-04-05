<script setup lang="ts">
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

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

  // --- Process the Outer HTML with Readability and Turndown ---

  const restoredDocument = new DOMParser().parseFromString(
    outerHTML,
    "text/html",
  );
  const readable = new Readability(restoredDocument).parse(); // NOTE: destructive; parse() **modifies** the document

  if (!readable || !readable.content) {
    console.error("Failed to parse content with Readability.");
    throw new Error("Failed to parse content with Readability.");
  }

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(readable.content);

  navigator.clipboard.writeText(markdown);
};
</script>

<template>
  <h1>Read-y</h1>
  <p>Click to copy the document in the current tab to clipboard.</p>
  <button @click="copyToClipboard">Copy</button>

  <!-- TODO: Add feedback to the user after copying -->
  <!-- TODO: Add size of the copied content to the feedback -->
  <!-- TODO: Add Custom Selector (user input) for content extraction -->
</template>

<style scoped></style>
