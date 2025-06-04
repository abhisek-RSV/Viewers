const customHangingProtocol = {
  id: 'customHangingProtocol',
  name: 'Smart Layout Protocol',
  locked: true,
  imageLoadStrategy: 'interleaveCenter',
  hasUpdatedPriorsInformation: false,

  protocolMatchingRules: [
    {
      id: 'defaultRule',
      weight: 1,
      attribute: 'StudyInstanceUID',
      constraint: { required: true },
    },
  ],

  displaySetSelectors: {
    ctDisplaySet: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: { equals: 'CT' },
        },
        {
          attribute: 'isReconstructable',
          constraint: { equals: true },
        },
      ],
    },
    otherDisplaySet: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: { notEquals: 'CT' },
        },
      ],
    },
  },

  stages: [
    // CT Stage - 2×2 grid
    {
      id: 'ctStage',
      name: 'CT View',
      viewportMatchRules: [
        {
          attribute: 'Modality',
          constraint: { equals: 'CT' },
        },
      ],
      viewportStructure: {
        type: 'grid',
        properties: {
          rows: 2,
          columns: 2,
          viewportOptions: {
            viewportType: 'volume',
          },
        },
      },
      viewports: [
        {
          viewportOptions: { orientation: 'axial' },
          displaySets: [{ id: 'ctDisplaySet' }],
        },
        {
          viewportOptions: { orientation: 'sagittal' },
          displaySets: [{ id: 'ctDisplaySet' }],
        },
        {
          viewportOptions: { orientation: 'coronal' },
          displaySets: [{ id: 'ctDisplaySet' }],
        },
        {
          viewportOptions: {},
          displaySets: [{ id: 'ctDisplaySet' }],
        },
      ],
    },
    // Default Stage - 1×1 for all other modalities
    {
      id: 'defaultStage',
      name: 'Default View',
      viewportStructure: {
        type: 'grid',
        properties: {
          rows: 1,
          columns: 1,
          viewportOptions: {
            viewportType: 'stack',
          },
        },
      },
      viewports: [
        {
          displaySets: [{ id: 'otherDisplaySet' }],
        },
      ],
    },
  ],
};

export default customHangingProtocol;
