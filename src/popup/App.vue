<script setup lang="ts">
import { ref } from "vue";

import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

const copied = ref(false);
const size = ref(0);
const customSelector = ref("");

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

const getOuterHTMLInTab = async (tabId: number) => {
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => document.documentElement.outerHTML,
  });

  if (!result || !result.result) {
    throw new Error("No result from script execution.");
  }

  return result.result;
};

const processOuterHTML = (outerHTML: string) => {
  const restoredDocument = new DOMParser().parseFromString(
    outerHTML,
    "text/html",
  );

  if (customSelector.value.length > 0) {
    const element = restoredDocument.querySelector(customSelector.value);

    if (!element) {
      throw new Error("No element found for the provided custom selector.");
    }

    const turndownService = new TurndownService();
    return turndownService.turndown(element.outerHTML);
  } else {
    const readable = new Readability(restoredDocument).parse(); // NOTE: destructive; parse() **modifies** the document

    if (!readable || !readable.content) {
      throw new Error("Failed to parse content with Readability.");
    }

    const turndownService = new TurndownService();
    return turndownService.turndown(readable.content);
  }
};

const copyToClipboard = async () => {
  // --- Get Current Tab ---

  const tab = await getCurrentTab();

  if (!tab || !tab.id) {
    throw new Error("Failed to get current tab.");
  }

  // --- Get Outer HTML in Current Tab ---

  const outerHTML = await getOuterHTMLInTab(tab.id);

  // --- Process the Outer HTML with Readability and Turndown ---

  const markdown = processOuterHTML(outerHTML);

  // --- Side Effects ---

  navigator.clipboard.writeText(markdown);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 3000);
  size.value = markdown.length;
};
</script>

<template>
  <h1>Read-y</h1>

  <p>Click to copy the document in the current tab to clipboard.</p>
  <button @click="copyToClipboard">
    <span v-if="!copied">Copy</span>
    <span v-else>Copied!</span>
  </button>

  <p>If needed, you can specify a custom selector for content extraction.</p>
  <div class="custom-selector-container">
    <input type="text" placeholder="Custom Selector" v-model="customSelector" />
    <button @click="customSelector = ''">Clear</button>
  </div>

  <div>
    <div>Chars copied: {{ size }}</div>
  </div>
</template>

<style scoped>
.custom-selector-container {
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
  }
}
</style>
