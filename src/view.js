/* eslint-disable no-console */
// console.log( 'Hello World! (from activecalculatorblock-activecalculator-block block)' );
/* eslint-enable no-console */

(function(){var a="https://app.activecalculator.com";window.addEventListener("message",function(d){if(d.origin!==a){return}if(d.data&&d.data.action==="UPDATE_CALCULATOR_IFRAME_HEIGHT"){var c=document.querySelector('iframe[name="ActiveCalculator"]');var b=parseInt(d.data.payload.height,10);if(c&&!isNaN(b)&&b>0){c.style.height=b+"px"}}})})();