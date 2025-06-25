import StyledComponent from "./styled-component.js";
// Your EventCard component extends the base class
class EventCard extends StyledComponent {
  static get observedAttributes() {
    return ["avatar", "speaker"];
  }

  constructor() {
    super();
    this.render();
  }

  getTemplate() {
    return `
      <div class="card w-full m-0 flex flex-col items-start justify-between radius-lg">
        <h3 class="mb-sm"><slot name="title"></slot></h3>
        <div class="bg-gray-100 p-md flex flex-col items-start w-full radius-md">
          <p><slot name="description"></slot></p>
          <div class="font-weight-bold flex items-center my-md">
            <img id="avatar" class="shadow-md radius-full mr-md" style="width:30px; height:30px;">
            <span class="text-black"><slot name="speaker"></slot></span>
          </div>
          <div class="flex flex-row items-center">
            <div class="shadow-md radius-md bg-primary p-sm font-weight-bold flex items-center mr-sm">
              <i class="ph-fill ph-calendar mr-xs text-white"></i>
              <small class="text-white"><slot name="date"></slot></small>
            </div>
            <small class="shadow-md radius-md bg-primary p-sm font-weight-bold text-white">
              <slot name="location"></slot>
            </small>
          </div>
        </div>
        <a href="#" class="mt-md w-full">
          <button class="button button-secondary w-full">
            <i class="ph-fill ph-ticket mr-xs"></i> <slot name="cta">Iscriviti</slot>
          </button>
        </a>
      </div>
    `;
  }

  getComponentStyles() {
    return `
      <style>
        /* Component-specific styles */
        .card {
          transition: transform 0.2s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
      </style>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "avatar") {
      const avatar = this.shadowRoot.getElementById("avatar");
      if (avatar) {
        avatar.src = newValue;
        avatar.alt = this.getAttribute("speaker") || "Avatar";
      }
    }
    if (name === "speaker") {
      const avatar = this.shadowRoot.getElementById("avatar");
      if (avatar) {
        avatar.alt = newValue || "Avatar";
      }

      const slot = this.shadowRoot.querySelector('slot[name="speaker"]');
      if (slot) {
        slot.textContent = newValue || "Speaker";
      }
    }
  }

  connectedCallback() {
    if (this.hasAttribute("avatar")) {
      const avatar = this.shadowRoot.getElementById("avatar");
      const speaker = this.getAttribute("speaker");
      if (avatar) {
        avatar.src = this.getAttribute("avatar");
        avatar.alt = speaker || "Avatar";
      }

      const slot = this.shadowRoot.querySelector('slot[name="speaker"]');
      if (slot) {
        slot.textContent = speaker || "Speaker";
      }
    }
  }
}

customElements.define("event-card", EventCard);
