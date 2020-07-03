Blockly.Block.prototype.isShadow = () => false;

/**
 * Wrap text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 */
Blockly.utils.wrap = function(text, limit) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        lines[i] = Blockly.utils.wrapLine_(lines[i], limit);
    }
    return lines.join('\n');
};

/**
 * Wrap single line of text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 * @private
 */
Blockly.utils.wrapLine_ = function(inputText, inputLimit) {
    if (inputText.length <= inputLimit) {
        // Short text, no need to wrap.
        return inputText;
    }
    // Split the text into words.
    var words = inputText.trim().split(/\s+/);
    var limit = 0;
    // Set limit to be the length of the largest word.
    for (var i = 0; i < words.length; i++) {
        if (words[i].length > inputLimit) {
            limit = words[i].length;
        }
    }

    var lastScore;
    var score = -Infinity;
    var lastText;
    var lineCount = 1;
    do {
        lastScore = score;
        lastText = inputText;
        // Create a list of booleans representing if a space (false) or
        // a break (true) appears after each word.
        var wordBreaks = [];
        // Seed the list with evenly spaced linebreaks.
        var steps = words.length / lineCount;
        var insertedBreaks = 1;
        for (var v = 0; v < words.length - 1; v++) {
            if (insertedBreaks < (v + 1.5) / steps) {
                insertedBreaks++;
                wordBreaks[v] = true;
            } else {
                wordBreaks[v] = false;
            }
        }
        wordBreaks = Blockly.utils.wrapMutate_(words, wordBreaks, limit);
        score = Blockly.utils.wrapScore_(words, wordBreaks, limit);
        Blockly.utils.wrapToText_(words, wordBreaks); //text =
        lineCount++;
    } while (score > lastScore);
    return lastText;
};

/**
 * Compute a score for how good the wrapping is.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {number} Larger the better.
 * @private
 */
Blockly.utils.wrapScore_ = function(words, wordBreaks, limit) {
    // If this function becomes a performance liability, add caching.
    // Compute the length of each line.
    var lineLengths = [0];
    var linePunctuation = [];
    for (var i = 0; i < words.length; i++) {
        lineLengths[lineLengths.length - 1] += words[i].length;
        if (wordBreaks[i] === true) {
            lineLengths.push(0);
            linePunctuation.push(words[i].charAt(words[i].length - 1));
        } else if (wordBreaks[i] === false) {
            lineLengths[lineLengths.length - 1]++;
        }
    }
    var maxLength = Math.max.apply(Math, lineLengths);

    var score = 0;
    for (var b = 0; b < lineLengths.length; b++) {
        // Optimize for width.
        // -2 points per char over limit (scaled to the power of 1.5).
        score -= Math.pow(Math.abs(limit - lineLengths[b]), 1.5) * 2;
        // Optimize for even lines.
        // -1 point per char smaller than max (scaled to the power of 1.5).
        score -= Math.pow(maxLength - lineLengths[b], 1.5);
        // Optimize for structure.
        // Add score to line endings after punctuation.
        if ('.?!'.indexOf(linePunctuation[b]) != -1) {
            score += limit / 3;
        } else if (',;)]}'.indexOf(linePunctuation[b]) != -1) {
            score += limit / 4;
        }
    }
    // All else being equal, the last line should not be longer than the
    // previous line.  For example, this looks wrong:
    // aaa bbb
    // ccc ddd eee
    if (lineLengths.length > 1 && lineLengths[lineLengths.length - 1] <= lineLengths[lineLengths.length - 2]) {
        score += 0.5;
    }
    return score;
};

/**
 * Mutate the array of line break locations until an optimal solution is found.
 * No line breaks are added or deleted, they are simply moved around.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {!Array.<boolean>} New array of optimal line breaks.
 * @private
 */
Blockly.utils.wrapMutate_ = function(words, wordBreaks, limit) {
    var bestScore = Blockly.utils.wrapScore_(words, wordBreaks, limit);
    var bestBreaks;
    // Try shifting every line break forward or backward.
    for (var i = 0; i < wordBreaks.length - 1; i++) {
        if (wordBreaks[i] == wordBreaks[i + 1]) {
            continue;
        }
        var mutatedWordBreaks = [].concat(wordBreaks);
        mutatedWordBreaks[i] = !mutatedWordBreaks[i];
        mutatedWordBreaks[i + 1] = !mutatedWordBreaks[i + 1];
        var mutatedScore = Blockly.utils.wrapScore_(words, mutatedWordBreaks, limit);
        if (mutatedScore > bestScore) {
            bestScore = mutatedScore;
            bestBreaks = mutatedWordBreaks;
        }
    }
    if (bestBreaks) {
        // Found an improvement.  See if it may be improved further.
        return Blockly.utils.wrapMutate_(words, bestBreaks, limit);
    }
    // No improvements found.  Done.
    return wordBreaks;
};

/**
 * Reassemble the array of words into text, with the specified line breaks.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @return {string} Plain text.
 * @private
 */
Blockly.utils.wrapToText_ = function(words, wordBreaks) {
    var text = [];
    for (var i = 0; i < words.length; i++) {
        text.push(words[i]);
        if (wordBreaks[i] !== undefined) {
            text.push(wordBreaks[i] ? '\n' : ' ');
        }
    }
    return text.join('');
};
