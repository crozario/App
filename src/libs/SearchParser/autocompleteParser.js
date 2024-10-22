// @generated by Peggy 4.0.3.
//
// https://peggyjs.org/


function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { query: peg$parsequery };
  var peg$startRuleFunction = peg$parsequery;

  var peg$c0 = "in";
  var peg$c1 = "currency";
  var peg$c2 = "tag";
  var peg$c3 = "category";
  var peg$c4 = "to";
  var peg$c5 = "taxRate";
  var peg$c6 = "from";
  var peg$c7 = "expenseType";
  var peg$c8 = "type";
  var peg$c9 = "status";
  var peg$c10 = "!=";
  var peg$c11 = ">=";
  var peg$c12 = ">";
  var peg$c13 = "<=";
  var peg$c14 = "<";
  var peg$c15 = "\"";

  var peg$r0 = /^[:=]/;
  var peg$r1 = /^[^"\r\n]/;
  var peg$r2 = /^[^ "\t\n\r]/;
  var peg$r3 = /^[ \t\r\n]/;

  var peg$e0 = peg$otherExpectation("key");
  var peg$e1 = peg$literalExpectation("in", false);
  var peg$e2 = peg$literalExpectation("currency", false);
  var peg$e3 = peg$literalExpectation("tag", false);
  var peg$e4 = peg$literalExpectation("category", false);
  var peg$e5 = peg$literalExpectation("to", false);
  var peg$e6 = peg$literalExpectation("taxRate", false);
  var peg$e7 = peg$literalExpectation("from", false);
  var peg$e8 = peg$literalExpectation("expenseType", false);
  var peg$e9 = peg$literalExpectation("type", false);
  var peg$e10 = peg$literalExpectation("status", false);
  var peg$e11 = peg$otherExpectation("operator");
  var peg$e12 = peg$classExpectation([":", "="], false, false);
  var peg$e13 = peg$literalExpectation("!=", false);
  var peg$e14 = peg$literalExpectation(">=", false);
  var peg$e15 = peg$literalExpectation(">", false);
  var peg$e16 = peg$literalExpectation("<=", false);
  var peg$e17 = peg$literalExpectation("<", false);
  var peg$e18 = peg$otherExpectation("quote");
  var peg$e19 = peg$literalExpectation("\"", false);
  var peg$e20 = peg$classExpectation(["\"", "\r", "\n"], true, false);
  var peg$e21 = peg$otherExpectation("word");
  var peg$e22 = peg$classExpectation([" ", "\"", "\t", "\n", "\r"], true, false);
  var peg$e23 = peg$otherExpectation("whitespace");
  var peg$e24 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false);

  var peg$f0 = function(ranges) { return { autocomplete, ranges }; };
  var peg$f1 = function(filters) { return filters.filter(Boolean).flat(); };
  var peg$f2 = function(key, op, value) {
      if (!value) {
        autocomplete = {
          key,
          value: null,
          start: location().end.offset,
          length: 0,
        };
        return;
      }

      autocomplete = {
        key,
        ...value[value.length - 1],
      };

      return value.map(({ start, length }) => ({
        key,
        start,
        length,
      }));
    };
  var peg$f3 = function() { autocomplete = null; };
  var peg$f4 = function(parts) {
      const ends = location();
      const value = parts.flat();
      let count = ends.start.offset;
      const result = [];
      value.forEach((filter) => {
        result.push({
          value: filter,
          start: count,
          length: filter.length,
        });
        count += filter.length + 1;
      });
      return result;
    };
  var peg$f5 = function() { return "eq"; };
  var peg$f6 = function() { return "neq"; };
  var peg$f7 = function() { return "gte"; };
  var peg$f8 = function() { return "gt"; };
  var peg$f9 = function() { return "lte"; };
  var peg$f10 = function() { return "lt"; };
  var peg$f11 = function(chars) { return chars.join(""); };
  var peg$f12 = function(chars) {
      return chars.join("").trim().split(",").filter(Boolean);
    };
  var peg$f13 = function() { return "and"; };
  var peg$currPos = options.peg$currPos | 0;
  var peg$savedPos = peg$currPos;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;

  var peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsequery() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    s2 = peg$parsefilterList();
    s3 = peg$parse_();
    peg$savedPos = s0;
    s0 = peg$f0(s2);

    return s0;
  }

  function peg$parsefilterList() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsefilter();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parselogicalAnd();
      s3 = peg$parsefilter();
      if (s3 === peg$FAILED) {
        peg$currPos = s2;
        s2 = peg$FAILED;
      } else {
        s2 = s3;
      }
    }
    peg$savedPos = s0;
    s1 = peg$f1(s1);
    s0 = s1;

    return s0;
  }

  function peg$parsefilter() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsedefaultFilter();
    if (s1 === peg$FAILED) {
      s1 = peg$parsefreeTextFilter();
    }
    if (s1 !== peg$FAILED) {
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedefaultFilter() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = peg$parse_();
    s2 = peg$parseautocompleteKey();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseoperator();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s6 = peg$parseidentifier();
        if (s6 === peg$FAILED) {
          s6 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f2(s2, s4, s6);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefreeTextFilter() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    s2 = peg$parseidentifier();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f3();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseautocompleteKey() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c0) {
      s1 = peg$c0;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e1); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 8) === peg$c1) {
        s1 = peg$c1;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c2) {
          s1 = peg$c2;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e3); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c3) {
            s1 = peg$c3;
            peg$currPos += 8;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e4); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c4) {
              s1 = peg$c4;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e5); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 7) === peg$c5) {
                s1 = peg$c5;
                peg$currPos += 7;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e6); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c6) {
                  s1 = peg$c6;
                  peg$currPos += 4;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e7); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 11) === peg$c7) {
                    s1 = peg$c7;
                    peg$currPos += 11;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$e8); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c8) {
                      s1 = peg$c8;
                      peg$currPos += 4;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$e9); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 6) === peg$c9) {
                        s1 = peg$c9;
                        peg$currPos += 6;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$e10); }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }

    return s0;
  }

  function peg$parseidentifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsequotedString();
    if (s2 === peg$FAILED) {
      s2 = peg$parsealphanumeric();
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsequotedString();
        if (s2 === peg$FAILED) {
          s2 = peg$parsealphanumeric();
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f4(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseoperator() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r0.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f5();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e13); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f6();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c11) {
          s1 = peg$c11;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e14); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$f7();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 62) {
            s1 = peg$c12;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e15); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f8();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c13) {
              s1 = peg$c13;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e16); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$f9();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 60) {
                s1 = peg$c14;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e17); }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f10();
              }
              s0 = s1;
            }
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e11); }
    }

    return s0;
  }

  function peg$parsequotedString() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c15;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = input.charAt(peg$currPos);
      if (peg$r1.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e20); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = input.charAt(peg$currPos);
        if (peg$r1.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e20); }
        }
      }
      if (input.charCodeAt(peg$currPos) === 34) {
        s3 = peg$c15;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e19); }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f11(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }

    return s0;
  }

  function peg$parsealphanumeric() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e22); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r2.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e22); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f12(s1);
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }

    return s0;
  }

  function peg$parselogicalAnd() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parse_();
    peg$savedPos = s0;
    s1 = peg$f13();
    s0 = s1;

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r3.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e24); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r3.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e24); }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) { peg$fail(peg$e23); }

    return s0;
  }

 let autocomplete = null; 
  peg$result = peg$startRuleFunction();

  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos
    });
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

const peg$allowedStartRules = [
  "query"
];

export {
  peg$allowedStartRules as StartRules,
  peg$SyntaxError as SyntaxError,
  peg$parse as parse
};
