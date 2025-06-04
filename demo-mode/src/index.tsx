import { hotkeys } from '@ohif/core';
import { initToolGroups, toolbarButtons } from '@ohif/mode-longitudinal';
import { id } from './id';
import CustomRoyPanel from './CustomRoyPanel';

const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
};

const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};

/**
 * Just two dependencies to be able to render a viewport with panels in order
 * to make sure that the mode is working.
 */
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  'my-extension': '^0.0.1',
};

function modeFactory({ modeConfiguration }) {
  return {
    /**
     * Mode ID, which should be unique among modes used by the viewer. This ID
     * is used to identify the mode in the viewer's state.
     */
    id,
    routeName: 'template',
    /**
     * Mode name, which is displayed in the viewer's UI in the workList, for the
     * user to select the mode.
     */
    displayName: 'Roy Mode',
    /**
     * Runs when the Mode Route is mounted to the DOM. Usually used to initialize
     * Services and other resources.
     */
    onModeEnter: ({ servicesManager, extensionManager, commandsManager }: withAppTypes) => {
      const { measurementService, toolbarService, toolGroupService } = servicesManager.services;

      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      initToolGroups(extensionManager, toolGroupService, commandsManager);

      toolbarService.register([...toolbarButtons]);
      toolbarService.updateSection('primary', [
        'MeasurementTools',
        'Zoom',
        'Pan',
        'TrackballRotate',
        'WindowLevel',
        'Capture',
        'Layout',
        'Crosshairs',
        'MoreTools',
      ]);

      toolbarService.updateSection('MeasurementTools', [
        'Length',
        'Bidirectional',
        'ArrowAnnotate',
        'EllipticalROI',
        'RectangleROI',
        'CircleROI',
        'PlanarFreehandROI',
        'SplineROI',
        'LivewireContour',
      ]);

      toolbarService.updateSection('MoreTools', [
        'Reset',
        'rotate-right',
        'flipHorizontal',
        'ImageSliceSync',
        'ReferenceLines',
        'ImageOverlayViewer',
        'StackScroll',
        'invert',
        'Probe',
        'Cine',
        'Angle',
        'CobbAngle',
        'Magnify',
        'CalibrationLine',
        'TagBrowser',
        'AdvancedMagnify',
        'UltrasoundDirectionalTool',
        'WindowLevelRegion',
      ]);

      const disabledButtonDefinitions = [
        {
          id: 'Zoom',
          uiType: 'ohif.toolButton',
          props: {
            icon: 'tool-zoom',
            label: 'Zoom',
            tooltip: 'Zoom is disabled in this mode',

            evaluate: () => ({
              hideWhenDisabled: true,
              disabled: true,
            }),
          },
        },
        {
          id: 'Pan',
          uiType: 'ohif.toolButton',
          props: {
            icon: 'tool-move',
            label: 'Pan',
            tooltip: 'Pan is disabled in this Roy',

            evaluate: {
              name: 'evaluate.cornerstoneTool',
              options: {
                disabled: true,
                disabledText: 'Pan is disabled in this mode',
                hideWhenDisabled: false,
              },
            },
            id: '',
          },
        },
      ];

      // Register overrides
      toolbarService.register(disabledButtonDefinitions, true);
      toolbarService.register(
        [
          {
            id: 'CircleROI',
            uiType: 'ohif.toolButton',
            props: {
              icon: 'tool-circle',
              label: 'Circle ROI',
              tooltip: 'Circle ROI is disabled in this Roy Mode',
              evaluate: () => ({
                disabled: true,
                hideWhenDisabled: false,
                disabledText: 'circle-ROI is disabled in ROY mode',
                className: 'disabled-tool-button',
              }),
              id: '',
            },
          },
          {
            id: 'PlanarFreehandROI',
            uiType: 'ohif.toolButton',
            props: {
              icon: 'icon-tool-freehand-roi',
              label: 'Freehand ROI',
              tooltip: 'Freehand ROI is disabled in this Roy Mode',

              evaluate: () => ({
                disabled: true,
                hideWhenDisabled: false,
                disabledText: 'Freehand is disabled in ROY mode',
                className: 'disabled-tool-button',
              }),
              id: '',
            },
          },
        ],
        true
      ); // `true` is important — it overrides existing buttons

      // toolbarService.register([
      //   {
      //     id: 'roy-button',
      //     type: 'command',
      //     props: {
      //       icon: 'measure',
      //       label: 'Do Something',
      //       commands: 'myExtensionCommand',
      //     },
      //   },
      // ]);
      // Assuming you have access to the ToolbarService (as you do in your onModeEnter hook)
      // const { toolbarService } = servicesManager.services;
      // const disabledButtonDefinitions = [
      //   {
      //     id: 'Zoom',
      //     uiType: 'ohif.toolButton',
      //     props: {
      //       icon: 'tool-zoom',
      //       label: 'zoom',
      //       tooltip: 'Rectangle ROI (Disabled)',
      //       // className: 'disabled-tool-button',
      //     },
      //     evaluate: ({ viewportId, button, extra }) => ({
      //       disabled: true,
      //       hideWhenDisabled: false,
      //       disabledText: 'Rectangle ROI is currently disabled',
      //       className: 'opacity-50 cursor-not-allowed',
      //     }),
      //   },
      // ];

      // // Register the disabled button definitions
      // toolbarService?.register(disabledButtonDefinitions);

      // Alternative approach: Override existing buttons
      // This ensures the disabled versions take precedence
      // toolbarService.setButtons(disabledButtonDefinitions);
    },
    onModeExit: ({ servicesManager }: withAppTypes) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService,
      } = servicesManager.services;

      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    /** */
    validationTags: {
      study: [],
      series: [],
    },
    /**
     * A boolean return value that indicates whether the mode is valid for the
     * modalities of the selected studies. For instance a PET/CT mode should be
     */
    isValidMode: ({ modalities }) => {
      return { valid: true };
    },
    /**
     * Mode Routes are used to define the mode's behavior. A list of Mode Route
     * that includes the mode's path and the layout to be used. The layout will
     * include the components that are used in the layout. For instance, if the
     * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
     * it will include the leftPanels, rightPanels, and viewports. However, if
     * you define another layoutTemplate that includes a Footer for instance,
     * you should provide the Footer component here too. Note: We use Strings
     * to reference the component's ID as they are registered in the internal
     * ExtensionManager. The template for the string is:
     * `${extensionId}.{moduleType}.${componentId}`.
     */
    routes: [
      {
        path: 'template',
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: ['my-extension.panelModule.Roy Panel', ohif.rightPanel],
              rightPanels: [ohif.leftPanel, 'my-extension.panelModule.Custom Panel'],
              viewports: [
                {
                  namespace: cornerstone.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                  viewportOptions: {
                    background: [255, 255, 0],
                  },
                },
              ],
            },
          };
        },
      },
    ],
    /** List of extensions that are used by the mode */
    extensions: extensionDependencies,
    /** HangingProtocol used by the mode */
    // hangingProtocol: ['customHangingProtocol'],
    /** SopClassHandlers used by the mode */
    sopClassHandlers: [ohif.sopClassHandler],
    /** hotkeys for mode */
  };
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
