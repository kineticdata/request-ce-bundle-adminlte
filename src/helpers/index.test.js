import moment from 'moment';
import * as helpers from './index';
import * as constants from '../constants';

const spaceWithArray = {
  name: 'Acme',
  attributes: [
    { name: 'Icon', values: ['fa-space'] },
    { name: 'Color', values: ['red'] },
    { name: 'Shape', values: ['square'] },
  ],
};

const spaceWithObject = {
  name: 'Acme',
  attributes: {
    Icon: ['fa-space'],
    Color: ['red'],
    Shape: ['square'],
  },
};

const kappWithArray = {
  space: spaceWithArray,
  name: 'Catalog',
  attributes: [
    { name: 'Icon', values: ['fa-kapp'] },
    { name: 'Color', values: ['red'] },
  ],
};

const kappWithObject = {
  space: spaceWithObject,
  name: 'Catalog',
  attributes: {
    Icon: ['fa-kapp'],
    Color: ['red'],
  },
};

const formWithArray = {
  kapp: kappWithArray,
  name: 'iPad Request',
  attributes: [
    { name: 'Icon', values: ['fa-form'] },
  ],
};

const formWithObject = {
  kapp: kappWithObject,
  name: 'iPad Request',
  attributes: {
    Icon: ['fa-form'],
  },
};

const submissionWithArray = {
  form: formWithArray,
  values: {
    Owner: 'Bob',
  },
};

const submissionWithObject = {
  form: formWithObject,
  values: {
    Owner: 'Bob',
  },
};

const modelWithArray = {
  attributes: [
    { name: 'Icon', values: ['fa-bug'] },
    { name: 'Empty', values: [] },
  ],
};
const modelWithObject = {
  attributes: {
    Icon: ['fa-bug'],
    Empty: [],
  },
};

describe('getAttributeValue', () => {
  describe('attributes as array', () => {
    test('returns value', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Icon')).toBe('fa-bug');
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'foo')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'foo', 'def')).toBe('def');
    });

    test('returns undefined when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Empty')).toBeUndefined();
    });

    test('returns default when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Empty', 'def')).toBe('def');
    });
  });

  describe('attributes as object', () => {
    test('returns a value', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Icon')).toBe('fa-bug');
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'foo')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'foo', 'DEF')).toBe('DEF');
    });

    test('returns undefined when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Empty')).toBeUndefined();
    });

    test('returns default when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Empty', 'DEF')).toBe('DEF');
    });
  });

  describe('attributes undefined', () => {
    test('returns undefined', () => {
      expect(helpers.getAttributeValue({}, 'name')).toBeUndefined();
    });
  });
});


describe('getAttributeValues', () => {
  describe('attributes as array', () => {
    test('returns the value', () => {
      expect(helpers.getAttributeValues({
        attributes: [
          { name: 'Colors', values: ['red', 'green'] },
        ],
      }, 'Colors')).toEqual(['red', 'green']);
    });

    test('returns default array when attribute values is empty', () => {
      expect(helpers.getAttributeValues({
        attributes: [
          { name: 'Colors', values: [] },
        ],
      }, 'Colors', ['default'])).toEqual(['default']);
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValues({
        attributes: [],
      }, 'Other')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValues({
        attributes: [],
      }, 'Other', ['default'])).toEqual(['default']);
    });
  });

  describe('attributes as object', () => {
    test('returns the value', () => {
      expect(helpers.getAttributeValues({
        attributes: {
          Colors: ['red', 'green'],
        },
      }, 'Colors')).toEqual(['red', 'green']);
    });

    test('returns default array when attribute values is empty', () => {
      expect(helpers.getAttributeValues({
        attributes: {
          Colors: [],
        },
      }, 'Colors', ['default'])).toEqual(['default']);
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValues({
        attributes: {},
      }, 'Other')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValues({
        attributes: {},
      }, 'Other', ['default'])).toEqual(['default']);
    });
  });

  describe('attributes undefined', () => {
    test('returns undefined', () => {
      expect(helpers.getAttributeValues({}, 'name')).toBeUndefined();
    });
  });
});

describe('getConfig', () => {
  // In most of the tests below we only test that the helper propagates to its
  // immediate parent to reduce the number of tests. These test that they
  // propagate properly starting wth the submission going all the way to the
  // space.
  describe('end-to-end', () => {
    describe('array style attributes', () => {
      test('returns the space attribute value', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the kapp attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [{ name: 'Shape', values: ['Other'] }] },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the space attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [] },
          space: { attributes: [{ name: 'Shape', values: ['Other'] }] },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Other',
          defaultValue: 'foo',
        })).toBe('foo');
      });
    });

    describe('object style attributes', () => {
      test('returns the space attribute value', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the space attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [] },
          space: { attributes: { Shape: ['Other'] } },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Other',
          defaultValue: 'foo',
        })).toBe('foo');
      });
    });
  });

  describe('with submission', () => {
    test('throws when values are not included', () => {
      expect(() => {
        helpers.getConfig({ submission: {}, name: 'Foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the value from the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Owner',
        })).toBe('Bob');
      });

      test('delegates to the form included in the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the form passed to the function call', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          form: { attributes: [{ name: 'Icon', values: ['override'] }] },
          name: 'Icon',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the value from the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Owner',
        })).toBe('Bob');
      });

      test('delegates to the form included in the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the form passed to the function call', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          form: { attributes: { Icon: ['override'] } },
          name: 'Icon',
        })).toBe('override');
      });
    });
  });

  describe('with form', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ form: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the form', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the kapp included in the form', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the kapp passed to the function call', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          kapp: { attributes: [{ name: 'Color', values: ['override'] }] },
          name: 'Color',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the form', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the kapp included in the form', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the kapp passed to the function call', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          kapp: { attributes: [{ name: 'Color', values: ['override'] }] },
          name: 'Color',
        })).toBe('override');
      });
    });
  });

  describe('with kapp', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ kapp: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the space included in the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('delegates to the space passed to the function call', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          space: { attributes: [{ name: 'Shape', values: ['override'] }] },
          name: 'Shape',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithObject,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the space included in the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('delegates to the space passed to the function call', () => {
        expect(helpers.getConfig({
          kapp: formWithObject,
          space: { attributes: [{ name: 'Shape', values: ['override'] }] },
          name: 'Shape',
        })).toBe('override');
      });
    });
  });

  describe('with space', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ space: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the space', () => {
        expect(helpers.getConfig({
          space: spaceWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          space: spaceWithArray,
          name: 'Other',
          defaultValue: 'DEF',
        })).toBe('DEF');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the space', () => {
        expect(helpers.getConfig({
          space: spaceWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          space: spaceWithObject,
          name: 'Other',
          defaultValue: 'DEF',
        })).toBe('DEF');
      });
    });
  });
});

describe('getDueDate', () => {
  const submittedAt = '2017-05-28T20:59:44.929Z';
  const submittedAtEpoch = moment(submittedAt).unix();

  test('adds days due (from submission) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {
        'Days Due': '4',
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('adds days due (from form) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {},
      form: {
        attributes: {
          'Days Due': ['4'],
        },
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('adds days due (from kapp) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {},
      form: {
        attributes: {},
        kapp: {
          attributes: {
            'Days Due': ['4'],
          },
        },
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('returns null when submitted at is null', () => {
    expect(helpers.getDueDate({
      submittedAt: null,
      values: {
        'Days Due': '4',
      },
    }, 'Days Due')).toBeNull();
  });

  test('throws when days due attr is not defined', () => {
    expect(() => {
      helpers.getDueDate({
        submittedAt,
        values: {},
        form: {
          attributes: {},
          kapp: {
            attributes: {},
            space: {
              attributes: {},
            },
          },
        },
      }, 'Days Due');
    }).toThrow();
  });

  test('throws when days due attr is not a number', () => {
    expect(() => {
      helpers.getDueDate({
        submittedAt,
        values: {
          'Days Due': 'NaN',
        },
      }, 'Days Due');
    }).toThrow();
  });
});

describe('getDurationInDays', () => {
  test('returns 1 when 1 day difference', () => {
    const start = '2017-05-28T20:59:44.929Z';
    const end = '2017-05-29T20:59:44.929Z';
    expect(helpers.getDurationInDays(start, end)).toBe(1);
  });

  test('returns 0 when 1 minute difference', () => {
    const start = '2017-05-29T20:58:44.929Z';
    const end = '2017-05-29T20:59:44.929Z';
    expect(helpers.getDurationInDays(start, end)).toBe(0);
  });

  test('returns .1 when 3 hours difference', () => {
    const start = '2017-05-29T17:59:44.929Z';
    const end = '2017-05-29T20:59:44.929Z';
    expect(helpers.getDurationInDays(start, end)).toBe(0.1);
  });

  test('returns .5 when 12 hours difference', () => {
    const start = '2017-05-29T08:59:44.929Z';
    const end = '2017-05-29T20:59:44.929Z';
    expect(helpers.getDurationInDays(start, end)).toBe(0.5);
  });
});

describe('getStatus', () => {
  test('returns value of status field when it is present', () => {
    expect(helpers.getStatus({
      coreState: 'submitted',
      values: {
        Status: 'In Progress',
      },
    })).toBe('In Progress');
  });

  test('returns core state when status field is null', () => {
    expect(helpers.getStatus({
      coreState: 'submitted',
      values: {
        Status: null,
      },
    })).toBe('submitted');
  });

  test('returns core state when status field is not present', () => {
    expect(helpers.getStatus({
      coreState: 'submitted',
      values: {},
    })).toBe('submitted');
  });

  test('throws error when values are not included', () => {
    expect(() => {
      helpers.getStatus({});
    }).toThrow();
  });
});

describe('getRequester', () => {
  test('returns value of Requested By field when it is present', () => {
    expect(helpers.getRequester({
      submittedBy: 'Bob',
      values: {
        'Requested By': 'Rob',
      },
    })).toBe('Rob');
  });

  test('returns submittedBy when Requested By field is null', () => {
    expect(helpers.getRequester({
      submittedBy: 'Bob',
      values: {
        'Requested By': null,
      },
    })).toBe('Bob');
  });

  test('returns core submittedBy when Requested By field is not present', () => {
    expect(helpers.getRequester({
      submittedBy: 'Bob',
      values: {},
    })).toBe('Bob');
  });

  test('throws error when values are not included', () => {
    expect(() => {
      helpers.getRequester({});
    }).toThrow();
  });
});

describe('getStatusClass', () => {
  const values = {};
  const attributes = {};
  const statusConfig1 = {};
  statusConfig1[constants.STATUSES_ACTIVE] = ['In Progress'];
  statusConfig1[constants.STATUSES_INACTIVE] = ['Saved For Later'];
  statusConfig1[constants.STATUSES_CANCELLED] = ['Cancelled'];
  const statusConfig2 = {};
  statusConfig2[constants.STATUSES_ACTIVE] = ['Active', 'ACTIVE'];
  statusConfig2[constants.STATUSES_INACTIVE] = ['Inactive', 'INACTIVE'];
  statusConfig2[constants.STATUSES_CANCELLED] = ['Cancelled', 'CANCELLED'];

  describe('with status field value', () => {
    describe('using form attributes', () => {
      test('returns success when active status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'In Progress' },
          form: { attributes: statusConfig1, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.SUCCESS_LABEL_CLASS);
      });

      test('returns warning when inactive status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'Saved For Later' },
          form: { attributes: statusConfig1, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.WARNING_LABEL_CLASS);
      });

      test('returns danger when cancelled status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'Cancelled' },
          form: { attributes: statusConfig1, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.DANGER_LABEL_CLASS);
      });

      test('returns default when other status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'Other' },
          form: { attributes: statusConfig1, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.DEFAULT_LABEL_CLASS);
      });
    });

    describe('using kapp attributes', () => {
      test('returns success when active status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'ACTIVE' },
          form: { attributes: {}, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.SUCCESS_LABEL_CLASS);
      });

      test('returns warning when inactive status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'INACTIVE' },
          form: { attributes: {}, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.WARNING_LABEL_CLASS);
      });

      test('returns danger when cancelled status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'CANCELLED' },
          form: { attributes: {}, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.DANGER_LABEL_CLASS);
      });

      test('returns default when other status', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'Other' },
          form: { attributes: {}, kapp: { attributes: statusConfig2 } },
        })).toBe(constants.DEFAULT_LABEL_CLASS);
      });
    });

    describe('no attribute configuration', () => {
      test('returns default label when no attribute configuration', () => {
        expect(helpers.getStatusClass({
          values: { Status: 'In Progress' },
          form: { attributes, kapp: { attributes } },
        })).toBe(constants.DEFAULT_LABEL_CLASS);
      });
    });
  });

  describe('status field value null', () => {
    test('returns warning when coreState is draft', () => {
      expect(helpers.getStatusClass({
        values,
        form: { attributes, kapp: { attributes } },
        coreState: constants.CORE_STATE_DRAFT,
      })).toBe(constants.WARNING_LABEL_CLASS);
    });

    test('returns success when coreState is submitted', () => {
      expect(helpers.getStatusClass({
        values,
        form: { attributes, kapp: { attributes } },
        coreState: constants.CORE_STATE_SUBMITTED,
      })).toBe(constants.SUCCESS_LABEL_CLASS);
    });

    test('returns default when coreState is closed', () => {
      expect(helpers.getStatusClass({
        values,
        form: { attributes, kapp: { attributes } },
        coreState: constants.CORE_STATE_CLOSED,
      })).toBe(constants.DEFAULT_LABEL_CLASS);
    });

    test('returns default when coreState is something else', () => {
      expect(helpers.getStatusClass({
        values,
        form: { attributes, kapp: { attributes } },
        coreState: 'other',
      })).toBe(constants.DEFAULT_LABEL_CLASS);
    });
  });

  describe('missing includes', () => {
    test('throws error when values are not present', () => {
      expect(() => {
        helpers.getStatusClass({ form: { attributes, kapp: { attributes } } });
      }).toThrow();
    });

    test('throws error when form is not present', () => {
      expect(() => {
        helpers.getStatusClass({ values });
      }).toThrow();
    });

    test('throws error when form attributes are not present', () => {
      expect(() => {
        helpers.getStatusClass({ values, form: { kapp: { attributes } } });
      }).toThrow();
    });

    test('throws error when kapp is not present', () => {
      expect(() => {
        helpers.getStatusClass({ values, form: { attributes } });
      }).toThrow();
    });

    test('throws error when kapp attributes are not present', () => {
      expect(() => {
        helpers.getStatusClass({ values, form: { attributes, kapp: {} } });
      }).toThrow();
    });
  });
});
