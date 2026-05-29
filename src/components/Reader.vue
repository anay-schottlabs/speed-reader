<script setup>
import { ref } from 'vue';

// text in the textarea is passed down from App.vue
const props = defineProps({
    text: String
});

// the list that will be used to play text
// starts out empty, will be filled up by the parse method
const wordList = ref([]);

// enum to manage reader states
const PlayState = Object.freeze({
    STOPPED: "stopped",
    PAUSED: "paused",
    PLAYING: "playing"
});

const playState = ref(PlayState.STOPPED);

/**
 * Splits the input text from the textarea into a list of cleaned words.
 *
 * - Trims leading and trailing whitespace from the text.
 * - Replaces all consecutive whitespace characters (spaces, tabs, newlines) within the text with a single space,
 *   ensuring words are separated by only one space.
 *     - Uses the regex /\s+/g, which matches every sequence of one or more whitespace characters (including:
 *         - spaces, tabs (\t), newlines (\n), carriage returns (\r), and other Unicode whitespace)
 *       The global flag 'g' ensures that every such sequence is matched and replaced throughout the string, not just the first one.
 * - Splits the string into an array of individual words using a single space (" ") as the delimiter.
 * - The resulting wordList will be used for sequential display during the speed reading session.
 * - Logs the parsed word list to the console for debugging.
 *
 * This method is intended to be called when the user clicks "Parse Text".
 */
function parse() {
    // Trim whitespace from both ends of the input text
    let cleanText = props.text.trim();

    // Replace any sequence of whitespace characters (spaces, tabs, newlines etc.) with a single space.
    // Regex explanation:
    //   - \s matches any whitespace character.
    //   - + matches one or more of the preceding (i.e., one or more whitespace characters).
    //   - The global flag 'g' replaces all occurrences throughout the string.
    cleanText = cleanText.replace(/\s+/g, " ");

    // Split the resulting string at each single space to create an array of words
    wordList.value = cleanText.split(" ");

    // Output resulting word list to console for verification/debugging
    console.log(wordList.value);
}

function start() {
    playState.value = PlayState.PLAYING;
}

function pause() {
    playState.value = PlayState.PAUSED;
}

function end() {
    playState.value = PlayState.STOPPED;
}
</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-grid mb-1">
            <button class="btn btn-secondary" @click="parse">Parse Text</button>
        </div>
        <div class="btn-group">
            <button
                class="btn btn-primary"
                v-if="playState != PlayState.PLAYING"
                @click="start"
            >{{ playState == PlayState.PAUSED ? "Continue Reader" : "Start Reader" }}</button>
            <button
                class="btn btn-warning"
                v-if="playState == PlayState.PLAYING"
                @click="pause"
            >Pause Reader</button>
            <button
                class="btn btn-danger"
                v-if="playState != PlayState.STOPPED"
                @click="end"
            >End Reader</button>
        </div>
    </div>
</template>

<style scoped></style>
