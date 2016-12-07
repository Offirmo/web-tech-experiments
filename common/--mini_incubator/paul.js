/* When given a hash, intelligently log it in aligned columns with color highlighting
 * or fallback to multi-lines if too big.
 * Autolog "learns" from seen logs and tries to keep values aligned for better viewing.
 */


const HUGE_WHITE = '                                                                                                                                                                                                                                                                                                                                                                            '

// dump of the output of npm/ansi-styles
const ANSI_STYLES = {
    "reset": {
        "open": "\u001b[0m",
        "close": "\u001b[0m"
    },
    "bold": {
        "open": "\u001b[1m",
        "close": "\u001b[22m"
    },
    "dim": {
        "open": "\u001b[2m",
        "close": "\u001b[22m"
    },
    "italic": {
        "open": "\u001b[3m",
        "close": "\u001b[23m"
    },
    "underline": {
        "open": "\u001b[4m",
        "close": "\u001b[24m"
    },
    "inverse": {
        "open": "\u001b[7m",
        "close": "\u001b[27m"
    },
    "hidden": {
        "open": "\u001b[8m",
        "close": "\u001b[28m"
    },
    "strikethrough": {
        "open": "\u001b[9m",
        "close": "\u001b[29m"
    },
    "black": {
        "open": "\u001b[30m",
        "close": "\u001b[39m"
    },
    "red": {
        "open": "\u001b[31m",
        "close": "\u001b[39m"
    },
    "green": {
        "open": "\u001b[32m",
        "close": "\u001b[39m"
    },
    "yellow": {
        "open": "\u001b[33m",
        "close": "\u001b[39m"
    },
    "blue": {
        "open": "\u001b[34m",
        "close": "\u001b[39m"
    },
    "magenta": {
        "open": "\u001b[35m",
        "close": "\u001b[39m"
    },
    "cyan": {
        "open": "\u001b[36m",
        "close": "\u001b[39m"
    },
    "white": {
        "open": "\u001b[37m",
        "close": "\u001b[39m"
    },
    "gray": {
        "open": "\u001b[90m",
        "close": "\u001b[39m"
    },
    "grey": {
        "open": "\u001b[90m",
        "close": "\u001b[39m"
    },
    "bgBlack": {
        "open": "\u001b[40m",
        "close": "\u001b[49m"
    },
    "bgRed": {
        "open": "\u001b[41m",
        "close": "\u001b[49m"
    },
    "bgGreen": {
        "open": "\u001b[42m",
        "close": "\u001b[49m"
    },
    "bgYellow": {
        "open": "\u001b[43m",
        "close": "\u001b[49m"
    },
    "bgBlue": {
        "open": "\u001b[44m",
        "close": "\u001b[49m"
    },
    "bgMagenta": {
        "open": "\u001b[45m",
        "close": "\u001b[49m"
    },
    "bgCyan": {
        "open": "\u001b[46m",
        "close": "\u001b[49m"
    },
    "bgWhite": {
        "open": "\u001b[47m",
        "close": "\u001b[49m"
    }
}

module.exports = {
    autoLoggerFactory: (options) => {
        "use strict";
        options = options || {}
        options.filter = options.filter || (() => true)
        options.maxLineLength = options.maxLineLength || process.stdout.columns || 160
        options.maxColumnLength = options.maxColumnLength || 24
        options.blacklist = options.blacklist || []
        options.initialKeys = options.initialKeys || []
        options.prefix = options.prefix || '» '
        options.separator = options.separator || ', '
        options.link = options.link || '='
        options.ellipsis = options.ellipsis || '…'

        const knownKeys = new Set(options.initialKeys)
        const keysState = {}
        const prefixLength = options.prefix.length
        const ellipsisLength = options.ellipsis.length
        const linkLength = options.link.length
        const maxValueLengthInMultilineMode = options.maxLineLength - prefixLength - options.maxColumnLength - linkLength

        function ensureStateFor(key) {
            if (keysState[key]) return

            keysState[key] = {
                maxSeenWidth: 1,
                keyStyle: ANSI_STYLES.gray.open,
                valueStyle: ANSI_STYLES.yellow.open,
            }
        }

        function autoLog(hash) {
            Object.keys(hash)
                .filter(key => !options.blacklist.includes(key))
                .forEach(key => knownKeys.add(key))

            let line = options.prefix
            let visibleLine = options.prefix
            knownKeys.forEach(key => {
                ensureStateFor(key)

                if (line.length > prefixLength) {
                    line += options.separator
                    visibleLine += options.separator
                }

                if (key in hash) {
                    line += keysState[key].keyStyle + key + ANSI_STYLES.reset.open
                    line += options.link
                    visibleLine += key + options.link

                    let valueAsString = '' + hash[key]
                    let valueLength = valueAsString.length
                    if (valueLength > options.maxColumnLength) {
                        valueAsString = valueAsString.slice(0, options.maxColumnLength - ellipsisLength) + options.ellipsis
                        valueLength = options.maxColumnLength
                    }
                    keysState[key].maxSeenWidth = Math.max(keysState[key].maxSeenWidth, valueLength)
                    line += keysState[key].valueStyle + (valueAsString + HUGE_WHITE).slice(0, keysState[key].maxSeenWidth) + ANSI_STYLES.reset.open
                    visibleLine += (valueAsString + HUGE_WHITE).slice(0, keysState[key].maxSeenWidth)
                }
                else {
                    line += HUGE_WHITE.slice(0, key.length + linkLength + keysState[key].maxSeenWidth)
                    visibleLine += HUGE_WHITE.slice(0, key.length + linkLength + keysState[key].maxSeenWidth)
                }
            })

            if (visibleLine.length > options.maxLineLength) {
                // too big, switch to a multi-line display
                console.log(options.prefix)
                knownKeys.forEach(key => {
                    let line = HUGE_WHITE.slice(0, prefixLength)

                    if (key in hash) {
                        line += keysState[key].keyStyle + key + ANSI_STYLES.reset.open
                        line += options.link

                        let valueAsString = '' + hash[key]
                        let valueLength = valueAsString.length
                        if (valueLength > maxValueLengthInMultilineMode) {
                            valueAsString = valueAsString.slice(0, maxValueLengthInMultilineMode - ellipsisLength) + options.ellipsis
                        }
                        line += keysState[key].valueStyle + valueAsString + ANSI_STYLES.reset.open

                        console.log(line)
                    }
                })
            }
            else
                console.log(line)
        }

        return autoLog
    }
}
