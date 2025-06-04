import { BaseTool } from '@cornerstonejs/tools';
import AbhisekModal from '../components/AbhisekModal';

export default class AbhisekTool extends BaseTool{
   static toolName = 'AbhisekTool';
    static configuration: { servicesManager: any; };
  
  constructor(toolProps, configuration) {
    super(toolProps);
    this.configuration = configuration;
  }

  static operations = {
    mouse: {
      click: (evt) => {
        const { element, currentPoints } = evt.detail;
        const { servicesManager } = this.configuration;
        console.log("welcome tool");
        if (servicesManager) {
          servicesManager.uiModalService.show({
            content: AbhisekModal,
            title: 'Abhisek Measurement',
            contentProps: {
              pointData: currentPoints.canvas,
              onClose: () => servicesManager.uiModalService.hide()
            }
          });
        }
      }
    }
  };
}