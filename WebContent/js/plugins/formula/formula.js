function $(id) {
    return document.getElementById(id);
}
var Panel = {
    plock: null,
    open: function(id) {
        if (this.plock == null) this.plock = id;
        id.style.overflow = "visible";
    },
    close: function(id) {
        if (id == this.plock || id == null) {
        	if (this.plock != null) this.plock.style.overflow = "hidden";
        	this.plock = null;
        } else id.style.overflow = "hidden";
    },
    init: function() {
        var divElem = document;
        var areas = divElem.getElementsByTagName("area");
        for (i = 0; i < areas.length; i++) {
            cgi = areas[i].alt;
            areas[i].cgi = cgi;
            areas[i].alt = "";
            if (areas[i].title == "") areas[i].title = cgi;
            if (areas[i].onclick == undefined) areas[i].onclick = function() {
                FormulaEditor.insert(this.cgi);
            };
        }
        if (divElem.getElementsByClassName == undefined) {
            divElem.getElementsByClassName = function(className) {
                var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
                var allElements = divElem.getElementsByTagName("*");
                var results = [];
                var element;
                for (var i = 0; (element = allElements[i]) != null; i++) {
                    var elementClass = element.className;
                    if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) results.push(element);
                }
                return results;
            }
        }
        var panels = divElem.getElementsByClassName("panel");
        for (i = 0; i < panels.length; i++) {
            panels[i].onmouseover = function(e) {
                Panel.open(this);
            };
            panels[i].onmouseout = function(e) {
                Panel.close(this);
            };
        }
    }
};
function Formula() {
    this.changed = false;
    this.orgtxt = "";
    this.addEvent = function(action, fn) {
        if (this.formula_input.addEventListener) this.formula_input.addEventListener(action, fn, false);
        else this.formula_input.attachEvent("on" + action, fn);
    };
    this.set = function() {
        this.formula_preview = $("formulaview");
        this.formula_input = $("formula");
        this.formula_info = "info";
        if (this.formula_input) {
            this.addEvent("keyup", 
            function() {
                FormulaEditor.textchanged();
                FormulaEditor.autorenderEqn(10);
            });
            if ($(this.formula_info)) {
                $(this.formula_info).onclick = function(e) {
                    FormulaEditor.targetArea.formula_input.focus();
                    $(this.formula_info).style.display="none";
                };
            }
        }
    };
    this.textchanged = function() {
        var txt = this.getEquationStr();
        if (txt.length == 0) {
        	$(this.formula_info).style.display = "block";
        	this.formula_preview.src = "formula.gif";
        }else $(this.formula_info).style.display="none";
        if (txt != this.orgtxt) {
            this.orgtxt = txt;
            this.changed = true;
            return true;
        }
        return false;
    };
    this.auton = 0;
    this.renderCountdown = function() {
        if (this.auton > 0) {
            this.auton--;
            var fn = new Function(this.renderCountdown());
            setTimeout(fn, 100);
        } else this.renderEqn();
    };
    this.autorenderEqn = function(n) {
        if (this.auton > 0 && n > 0) this.auton = n;
        else {
            this.auton = n;
            this.renderCountdown();
        }
    };
    this.insertText = function(txt, pos, inspos) {
        if (pos == 1000) {
            pos = txt.length - 1;
        }
        if (pos == null) {
            pos = txt.indexOf("{") + 1;
            if (pos <= 0) {
                txt += " ";
                pos = txt.length;
            } else {
                if (txt.charAt(pos) != "}") pos = txt.indexOf("}", pos) + 1;
            }
        }
        var insert_pos = (inspos == null) ? pos: inspos;
        var i;
        var myField = this.formula_input;
        var leftbracket = (txt.substring(1, 5) == "left");
        if (document.selection) {
            myField.focus();
            var sel = document.selection.createRange();
            i = this.formula_input.value.length + 1;
            var theCaret = sel.duplicate();
            while (theCaret.parentElement() == myField && theCaret.move("character", 1) == 1)--i;
            if ((leftbracket || insert_pos >= 0) && sel.text.length) {
                if (leftbracket) ins_point = 7;
                else ins_point = insert_pos;
                if (insert_pos == null) pos = txt.length + sel.text.length + 1;
                else if (insert_pos < pos) pos += sel.text.length;
                sel.text = txt.substring(0, ins_point) + sel.text + txt.substr(ins_point);
            } else sel.text = txt;
            var range = myField.createTextRange();
            range.collapse(true);
            pos = i + pos;
            pos -= myField.value.substr(0, pos).split("\n").length - 1;
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        } else {
            if (myField.selectionStart || myField.selectionStart == "0") {
                var startPos = myField.selectionStart;
                var endPos = myField.selectionEnd;
                var cursorPos = startPos + txt.length;
                if ((leftbracket || insert_pos >= 0) && endPos > startPos) {
                    if (leftbracket) ins_point = 7;
                    else ins_point = insert_pos;
                    if (insert_pos == null) pos = txt.length + endPos - startPos + 1;
                    else if (insert_pos < pos) pos += endPos - startPos;
                    txt = txt.substring(0, ins_point) + myField.value.substring(startPos, endPos) + txt.substr(ins_point);
                }
                myField.value = myField.value.substring(0, startPos) + txt + myField.value.substring(endPos, myField.value.length);
                myField.selectionStart = cursorPos;
                myField.selectionEnd = cursorPos;
                myField.focus();
                myField.setSelectionRange(startPos + pos, startPos + pos);
            } else myField.value += txt;
        }
        this.textchanged();
        this.autorenderEqn(10);
        Panel.close(null);
        myField.focus();
    };
    this.getEquationStr = function() {
        var val = this.formula_input.value;
        val = val.replace(/^\s+|\s+$/g, "");
        val = val.replace(/\s+/g, " ");
        if (val.length > 0) return FormulaEditor.getSize() + val;
        return "";
    };
    this.renderEqn = function() {
        var val = this.formula_input.value;
        val = val.replace(/^\s+|\s+$/g, "");
        if (val.length == 0) return true;
        var bracket = 0;
        var i;
        for (i = 0; i < val.length; i++) {
            switch (val.charAt(i)) {
            case "{":
                if (i == 0 || val[i - 1] != "\\") bracket++;
                break;
            case "}":
                if (i == 0 || val[i - 1] != "\\") bracket--;
                break;
            }
        }
        var div;
        if (bracket == 0) {
            var img = this.formula_preview;
            val = this.getEquationStr();
            sval = val.replace(/"/g, '\\"').replace(/\s/g, "&space;");
            if (this.changed) {
                img.src = "http://www.forkosh.dreamhost.com/mathtex.cgi?" + val;
            }
        } 
        this.changed = false;
    };
    this.set();
};
var FormulaEditor = {
    SID: 0,
    targetArray: new Array(),
    targetSize: 0,
    targetArea: null,
    curTarget: 0,
    autorenderEqn: function(n) {
        this.targetArea.autorenderEqn(n);
    },
    change: function(i) {
        if (i != this.curTarget) {
            this.curTarget = i;
        }
        this.targetArea = this.targetArray[i];
    },
    add: function(obj, resize) {
        this.targetArray[this.targetSize] = obj;
        obj.formula_input.onfocus = new Function("FormulaEditor.change(" + this.targetSize + ");");
        if (resize) {
            if (window.addEventListener) window.addEventListener("resize", new Function("FormulaEditor.resize(" + this.targetSize + ");"), false);
            else window.attachEvent("onresize", new Function("FormulaEditor.resize(" + this.targetSize + ");"));
            FormulaEditor.resize(this.targetSize);
        }
        if (this.targetSize == 0) obj.formula_input.focus();
        this.targetSize++;
    },
    init: function(obj, resize) {
        Panel.init();     
       	var d = new Date();
       	this.SID = d.getTime();
        if (obj !== undefined) {
            this.add(obj, resize);
            this.targetArea = obj;
        }
        var a = $("fontsize");
        if (a) a.onchange = function() {
            FormulaEditor.update();
        };
    },
    textchanged: function() {
        this.targetArea.textchanged();
    },
    update: function() {
        this.targetArea.textchanged();
        this.targetArea.renderEqn();
    },
    insert: function(txt, pos, inspos) {
        if (this.targetArea != null) {
            this.targetArea.insertText(txt, pos, inspos);
        }
    },
    getSize: function() {
        var a = $("fontsize");
        if (a && a.value != "") return a.value + " ";
        return "";
    },
    resize: function(num) {
        var x,
        y;
        if (self.innerHeight) y = self.innerHeight;
        else if (document.documentElement && document.documentElement.clientHeight) y = document.documentElement.clientHeight;
        else if (document.body) y = document.body.clientHeight;
        this.targetArray[num].formula_input.style.height = parseInt((y - 200) / 3) + "px";
    }
};