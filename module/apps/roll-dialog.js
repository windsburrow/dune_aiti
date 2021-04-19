export class STARollDialog {
  static async create(isAttribute, defaultValue) {
    let html = '';
    if (isAttribute) {
      // Grab the RollDialog HTML file/
      html = await renderTemplate('systems/sta/templates/apps/dicepool-attribute.html', {'defaultValue': defaultValue});
    } else {
      html = await renderTemplate('systems/sta/templates/apps/dicepool-challenge.html', {'defaultValue': defaultValue});
    }

    // Create a new promise for the HTML above.
    return new Promise((resolve) => {
      let formData = null;

      // Create a new dialog.
      const dlg = new Dialog({
        title: game.i18n.localize('sta.apps.dicepoolwindow'),
        content: html,
        buttons: {
          roll: {
            label: game.i18n.localize('sta.apps.rolldice'),
            callback: (html) => {
              formData = new FormData(html[0].querySelector('#dice-pool-form'));
              return resolve(formData);
            }
          }
        },
        default: 'roll',
        close: () => {}
      });
      
      // Render the dialog
      dlg.render(true);
    });
  }
}
