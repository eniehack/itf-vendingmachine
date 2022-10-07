<button class="hamberger">
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
</button>

<style>
button {
  border-color: transparent;
  background: transparent;
  cursor: pointer;
     width: 40px;
     height: 32px;
     position: relative;
 }
 .hamburger-bar {
  display: block;
  width: 100%;
  height: 4px;
  position: absolute;
  left: 0;
  background: #000;
}

.hamburger-bar:nth-child(1) {
  top: 0;
}

.hamburger-bar:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-bar:nth-child(3) {
  top: 100%;
  transform: translateY(-100%);
}
</style>
