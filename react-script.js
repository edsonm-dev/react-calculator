var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttons = [{
    id: "zero",
    value: 0,
    class: "number",
    gridarea: "zero" }, {
    id: "one",
    value: 1,
    class: "number",
    gridarea: "one" }, {
    id: "two",
    value: 2,
    class: "number",
    gridarea: "two" }, {
    id: "four",
    value: 4,
    class: "number",
    gridarea: "four" }, {
    id: "three",
    value: 3,
    class: "number",
    gridarea: "three" }, {
    id: "five",
    value: 5,
    class: "number",
    gridarea: "five" }, {
    id: "six",
    value: 6,
    class: "number",
    gridarea: "six" }, {
    id: "seven",
    value: 7,
    class: "number",
    gridarea: "seven" }, {
    id: "eight",
    value: 8,
    class: "number",
    gridarea: "eight" }, {
    id: "nine",
    value: 9,
    class: "number",
    gridarea: "nine" }, {
    id: "add",
    value: "+",
    class: "operator",
    gridarea: "add" }, {
    id: "multiply",
    value: "*",
    class: "operator",
    gridarea: "multiply" }, {
    id: "divide",
    value: "/",
    class: "operator",
    gridarea: "divide" }, {
    id: "subtract",
    value: "-",
    class: "operator",
    gridarea: "subtract" }, {
    id: "clear",
    value: "AC",
    class: "clear",
    gridarea: "clear" }, {
    id: "decimal",
    value: ".",
    class: "number",
    gridarea: "decimal" }, {
    id: "equals",
    value: "=",
    class: "operator",
    gridarea: "equals" }];

var inputPattern = /^((0|[1-9]+[0-9]*)(\.[0-9]*)?)$/;
var evalPattern = /^$/;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { input: '0',
            formula: '',
            evaluated: false };
        _this.handleNumbers = _this.handleNumbers.bind(_this);
        _this.handleClear = _this.handleClear.bind(_this);
        _this.handleOperators = _this.handleOperators.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "handleNumbers",
        value: function handleNumbers(e) {

            var copiedState = Object.assign({}, this.state);

            if (copiedState.evaluated == true) {
                copiedState.evaluated = false;
                copiedState.input = '0';
            }

            var inputUpdate = '';

            if (copiedState.input == '0' && String(e) == '.') {

                inputUpdate = copiedState.input.concat(String(e));
                console.log(inputUpdate);
            } else if (copiedState.input == '0' && String(e) != '.') {
                inputUpdate = String(e);
                console.log(inputUpdate);
            } else {
                inputUpdate = copiedState.input.concat(String(e));
            }

            //test updater with pattern
            if (inputPattern.test(inputUpdate)) {

                copiedState.input = inputUpdate;
            } else {
                console.log(inputPattern.test(copiedState.input), copiedState.input);
            }

            this.setState(copiedState);
        }
    }, {
        key: "handleClear",
        value: function handleClear(e) {
            console.log("clear");
            this.setState({ input: '0',
                formula: '',
                evaluated: false });
        }
    }, {
        key: "handleOperators",
        value: function handleOperators(e) {

            var copiedState = Object.assign({}, this.state);

            //if the last pressed button was a number or clear
            if (copiedState.evaluated == false) {
                if (copiedState.formula.substring(copiedState.formula.length - 1) == '=') {
                    copiedState.formula = copiedState.input.concat(e);
                } else {
                    copiedState.formula += copiedState.input;
                    copiedState.input = String(eval(copiedState.formula));
                    copiedState.formula += e;
                }
                //if the last pressed button was an operator    
            } else {

                if (copiedState.formula.substring(copiedState.formula.length - 1) == '=') {
                    copiedState.formula = copiedState.input.concat(e);
                } else {
                    if (e == '-' && copiedState.formula.substring(copiedState.formula.length - 2) != " -") {

                        copiedState.formula += " " + e;
                    } else if (copiedState.formula.substring(copiedState.formula.length - 2) == " -") {
                        copiedState.formula = copiedState.formula.substring(0, copiedState.formula.length - 3).concat(e);
                    } else {
                        copiedState.formula = copiedState.formula.substring(0, copiedState.formula.length - 1).concat(e);
                    }
                }
            }

            copiedState.evaluated = true;

            this.setState(copiedState);

            console.log("operator");
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var arr = [];

            var _loop = function _loop() {

                var clickFunction = function clickFunction() {};
                var num = x.value;
                switch (x.class) {

                    case "number":
                        clickFunction = _this2.handleNumbers;
                        break;
                    case "operator":
                        clickFunction = _this2.handleOperators;
                        break;
                    case "clear":
                        clickFunction = _this2.handleClear;
                        break;
                }

                arr.push(React.createElement(
                    "div",
                    { id: x.id,
                        className: x.class,
                        style: { gridArea: x.gridarea },
                        onClick: function onClick() {
                            return clickFunction(num);
                        } },
                    x.value
                ));
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    x = _step.value;

                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return React.createElement(
                "div",
                { className: "calculator" },
                React.createElement(Display, { value: this.state }),
                arr
            );
        }
    }]);

    return App;
}(React.Component);

var Display = function (_React$Component2) {
    _inherits(Display, _React$Component2);

    function Display() {
        _classCallCheck(this, Display);

        return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).apply(this, arguments));
    }

    _createClass(Display, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                { id: "input", style: { gridArea: "dplay" } },
                React.createElement(
                    "div",
                    { id: "formulaBar" },
                    this.props.value.formula
                ),
                React.createElement(
                    "div",
                    { id: "display" },
                    this.props.value.input
                )
            );
        }
    }]);

    return Display;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("appContainer"));