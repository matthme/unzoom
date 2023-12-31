import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  AppAgentClient,
  RoleName,
} from '@holochain/client';
import { localized } from '@lit/localize';
import { consume, provide } from '@lit/context';

import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@holochain-open-dev/elements/dist/elements/holo-identicon.js';
import './room-view';

import { UnzoomStore } from './unzoom-store';
import { clientContext, unzoomStoreContext } from './contexts';
import { UnzoomClient } from './unzoom-client';
import { sharedStyles } from './sharedStyles';


@localized()
@customElement('room-container')
export class RoomContainer extends LitElement {

  @provide({ context: unzoomStoreContext })
  @property({ type: Object })
  unzoomStore!: UnzoomStore;

  @consume({ context: clientContext })
  @state()
  client!: AppAgentClient;

  @property()
  roleName!: RoleName;


  @state()
  pingInterval: number | undefined;

  async firstUpdated() {
    this.unzoomStore = new UnzoomStore(
      new UnzoomClient(this.client, this.roleName, 'unzoom')
    );
  }

  render() {
    return html`
      <room-view></room-view>
    `;
  }

  static styles = [sharedStyles,
  css``
];
}

function numToLayout(num: number) {
  if (num === 1) {
    return 'single';
  }
  if (num <= 2) {
    return "double";
  }
  if (num <= 4) {
    return 'quartett';
  }
  if (num <= 6) {
    return 'sextett';
  }
  if (num <= 8) {
    return 'octett';
  }
  return 'unlimited';
}
