<template>
  <span class="tooltip">
      <button class="tooltip__btn" aria-describedby="some_id">
          <img src="/img/smile.svg" alt="smile">
      </button>
      <span class="tooltip__txt" role="tooltip" id="some_id">
        текст тултипа
      </span>
  </span>
</template>

<script>
export default {
  name: "ToolTip"
}
</script>

<style scoped>
.tooltip {
  position: relative;
  text-transform: none;
}

.tooltip__btn {
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #FFFFFF;
  border: none;
  border-radius: 100%;
  box-shadow: 2px 4px 10px rgba(0, 13, 84, 0.2);
  margin-left: 10px;
}

.tooltip__btn img {
  width: 6px;
  height: 10px;
}

.tooltip__txt {
  position: absolute;
  left: -10px;
  bottom: 40px;
  z-index: 3;

  width: max-content;
  max-width: 430px;
  padding: 10px 20px;

  box-shadow: 0 0 29px rgb(0 0 0 32%);
  border-radius: 4px;

  font-family: 'Intro Book';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #444B58;
  text-transform: inherit;

  background: #FFFFFF;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity .3s ease-in-out,transform .3s ease-in-out,visibility .3s ease-in-out;
  box-shadow: 2px 4px 10px rgba(0, 13, 84, 0.2);
}

.tooltip__txt::after {
  content: "";
  position: absolute;
  left: 23px;
  bottom: -8px;

  border-width: 10px 8px 0 8px;
  border-color: #ffffff transparent transparent transparent;
  border-style: solid;

  width: 0;
  height: 0;
}

.tooltip__btn:hover + .tooltip__txt {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.tooltip__btn:focus + .tooltip__txt {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>