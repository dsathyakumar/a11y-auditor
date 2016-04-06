'use strict';

//> @imports
var enumCreator = require('../utils/enumCreator');

//> local object that holds the list of enums and is exported
var _enums = {};

_enums.modeEnum = enumCreator({
    RUN: 'run',
    RUNONLY: 'runOnly'
});

_enums.displayEnum = enumCreator({
    ERR: 'error',
    WARN: 'warning',
    ERRWARN: 'errAndWarn'
});

_enums.widgetRolesEnum = enumCreator({});

_enums.severityEnum = enumCreator({
    INFO: 'info',
    WARN: 'warning',
    ERROR: 'error'
});

_enums.mixedValuesEnum = enumCreator({
    true: !0,
    false: !0,
    mixed: !0
});

_enums.ariaRolesEnum = enumCreator({
    alert: {
        namefrom: ['author'],
        parent: ['region']
    },
    alertdialog: {
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'alert',
            'dialog'
        ]
    },
    application: {
        namefrom: ['author'],
        namerequired: !0,
        parent: ['landmark']
    },
    article: {
        namefrom: ['author'],
        parent: [
            'document',
            'region'
        ]
    },
    banner: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    button: {
        childpresentational: !0,
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['command'],
        properties: [
            'aria-expanded',
            'aria-pressed'
        ]
    },
    checkbox: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['input'],
        requiredProperties: ['aria-checked'],
        properties: ['aria-checked']
    },
    columnheader: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'gridcell',
            'sectionhead',
            'widget'
        ],
        properties: ['aria-sort'],
        scope: ['row']
    },
    combobox: {
        mustcontain: [
            'listbox',
            'textbox'
        ],
        namefrom: ['author'],
        namerequired: !0,
        parent: ['select'],
        requiredProperties: ['aria-expanded'],
        properties: [
            'aria-expanded',
            'aria-autocomplete',
            'aria-required'
        ]
    },
    command: {
        abstract: !0,
        namefrom: ['author'],
        parent: ['widget']
    },
    complementary: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    composite: {
        abstract: !0,
        childpresentational: !1,
        namefrom: ['author'],
        parent: ['widget'],
        properties: ['aria-activedescendant']
    },
    contentinfo: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    definition: {
        namefrom: ['author'],
        parent: ['section']
    },
    dialog: {
        namefrom: ['author'],
        namerequired: !0,
        parent: ['window']
    },
    directory: {
        namefrom: [
            'contents',
            'author'
        ],
        parent: ['list']
    },
    document: {
        namefrom: [' author'],
        namerequired: !0,
        parent: ['structure'],
        properties: ['aria-expanded']
    },
    form: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    grid: {
        mustcontain: [
            'row',
            'rowgroup'
        ],
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'composite',
            'region'
        ],
        properties: [
            'aria-level',
            'aria-multiselectable',
            'aria-readonly'
        ]
    },
    gridcell: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'section',
            'widget'
        ],
        properties: [
            'aria-readonly',
            'aria-required',
            'aria-selected'
        ],
        scope: ['row']
    },
    group: {
        namefrom: [' author'],
        parent: ['section'],
        properties: ['aria-activedescendant']
    },
    heading: {
        namerequired: !0,
        parent: ['sectionhead'],
        properties: ['aria-level']
    },
    img: {
        childpresentational: !0,
        namefrom: ['author'],
        namerequired: !0,
        parent: ['section']
    },
    input: {
        abstract: !0,
        namefrom: ['author'],
        parent: ['widget']
    },
    landmark: {
        abstract: !0,
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !1,
        parent: ['region']
    },
    link: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['command'],
        properties: ['aria-expanded']
    },
    list: {
        mustcontain: [
            'group',
            'listitem'
        ],
        namefrom: ['author'],
        parent: ['region']
    },
    listbox: {
        mustcontain: ['option'],
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'list',
            'select'
        ],
        properties: [
            'aria-multiselectable',
            'aria-required'
        ]
    },
    listitem: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['section'],
        properties: [
            'aria-level',
            'aria-posinset',
            'aria-setsize'
        ],
        scope: ['list']
    },
    log: {
        namefrom: [' author'],
        namerequired: !0,
        parent: ['region']
    },
    main: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    marquee: {
        namerequired: !0,
        parent: ['section']
    },
    math: {
        childpresentational: !0,
        namefrom: ['author'],
        parent: ['section']
    },
    menu: {
        mustcontain: [
            'group',
            'menuitemradio',
            'menuitem',
            'menuitemcheckbox'
        ],
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'list',
            'select'
        ]
    },
    menubar: {
        namefrom: ['author'],
        parent: ['menu']
    },
    menuitem: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['command'],
        scope: [
            'menu',
            'menubar'
        ]
    },
    menuitemcheckbox: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'checkbox',
            'menuitem'
        ],
        scope: [
            'menu',
            'menubar'
        ]
    },
    menuitemradio: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'menuitemcheckbox',
            'radio'
        ],
        scope: [
            'menu',
            'menubar'
        ]
    },
    navigation: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    note: {
        namefrom: ['author'],
        parent: ['section']
    },
    option: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: ['input'],
        properties: [
            'aria-checked',
            'aria-posinset',
            'aria-selected',
            'aria-setsize'
        ]
    },
    presentation: {
        parent: ['structure']
    },
    progressbar: {
        childpresentational: !0,
        namefrom: ['author'],
        namerequired: !0,
        parent: ['range']
    },
    radio: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'checkbox',
            'option'
        ]
    },
    radiogroup: {
        mustcontain: ['radio'],
        namefrom: ['author'],
        namerequired: !0,
        parent: ['select'],
        properties: ['aria-required']
    },
    range: {
        abstract: !0,
        namefrom: ['author'],
        parent: ['widget'],
        properties: [
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow',
            'aria-valuetext'
        ]
    },
    region: {
        namefrom: [' author'],
        parent: ['section']
    },
    roletype: {
        abstract: !0,
        properties: 'aria-atomic aria-busy aria-controls aria-describedby aria-disabled aria-dropeffect aria-flowto aria-grabbed aria-haspopup aria-hidden aria-invalid aria-label aria-labelledby aria-live aria-owns aria-relevant'.split(
            ' ')
    },
    row: {
        mustcontain: [
            'columnheader',
            'gridcell',
            'rowheader'
        ],
        namefrom: [
            'contents',
            'author'
        ],
        parent: [
            'group',
            'widget'
        ],
        properties: [
            'aria-level',
            'aria-selected'
        ],
        scope: [
            'grid',
            'rowgroup',
            'treegrid'
        ]
    },
    rowgroup: {
        mustcontain: ['row'],
        namefrom: [
            'contents',
            'author'
        ],
        parent: ['group'],
        scope: ['grid']
    },
    rowheader: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'gridcell',
            'sectionhead',
            'widget'
        ],
        properties: ['aria-sort'],
        scope: ['row']
    },
    search: {
        namefrom: ['author'],
        parent: ['landmark']
    },
    section: {
        abstract: !0,
        namefrom: [
            'contents',
            'author'
        ],
        parent: ['structure'],
        properties: ['aria-expanded']
    },
    sectionhead: {
        abstract: !0,
        namefrom: [
            'contents',
            'author'
        ],
        parent: ['structure'],
        properties: ['aria-expanded']
    },
    select: {
        abstract: !0,
        namefrom: ['author'],
        parent: [
            'composite',
            'group',
            'input'
        ]
    },
    separator: {
        childpresentational: !0,
        namefrom: ['author'],
        parent: ['structure'],
        properties: [
            'aria-expanded',
            'aria-orientation'
        ]
    },
    scrollbar: {
        childpresentational: !0,
        namefrom: ['author'],
        namerequired: !1,
        parent: [
            'input',
            'range'
        ],
        requiredProperties: [
            'aria-controls',
            'aria-orientation',
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow'
        ],
        properties: [
            'aria-controls',
            'aria-orientation',
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow'
        ]
    },
    slider: {
        childpresentational: !0,
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'input',
            'range'
        ],
        requiredProperties: [
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow'
        ],
        properties: [
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow',
            'aria-orientation'
        ]
    },
    spinbutton: {
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'input',
            'range'
        ],
        requiredProperties: [
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow'
        ],
        properties: [
            'aria-valuemax',
            'aria-valuemin',
            'aria-valuenow',
            'aria-required'
        ]
    },
    status: {
        parent: ['region']
    },
    structure: {
        abstract: !0,
        parent: ['roletype']
    },
    tab: {
        namefrom: [
            'contents',
            'author'
        ],
        parent: [
            'sectionhead',
            'widget'
        ],
        properties: ['aria-selected'],
        scope: ['tablist']
    },
    tablist: {
        mustcontain: ['tab'],
        namefrom: ['author'],
        parent: [
            'composite',
            'directory'
        ],
        properties: ['aria-level']
    },
    tabpanel: {
        namefrom: ['author'],
        namerequired: !0,
        parent: ['region']
    },
    textbox: {
        namefrom: ['author'],
        namerequired: !0,
        parent: ['input'],
        properties: [
            'aria-activedescendant',
            'aria-autocomplete',
            'aria-multiline',
            'aria-readonly',
            'aria-required'
        ]
    },
    timer: {
        namefrom: ['author'],
        namerequired: !0,
        parent: ['status']
    },
    toolbar: {
        namefrom: ['author'],
        parent: ['group']
    },
    tooltip: {
        namerequired: !0,
        parent: ['section']
    },
    tree: {
        mustcontain: [
            'group',
            'treeitem'
        ],
        namefrom: ['author'],
        namerequired: !0,
        parent: ['select'],
        properties: [
            'aria-multiselectable',
            'aria-required'
        ]
    },
    treegrid: {
        mustcontain: ['row'],
        namefrom: ['author'],
        namerequired: !0,
        parent: [
            'grid',
            'tree'
        ]
    },
    treeitem: {
        namefrom: [
            'contents',
            'author'
        ],
        namerequired: !0,
        parent: [
            'listitem',
            'option'
        ],
        scope: [
            'group',
            'tree'
        ]
    },
    widget: {
        abstract: !0,
        parent: ['roletype']
    },
    window: {
        abstract: !0,
        namefrom: [' author'],
        parent: ['roletype'],
        properties: ['aria-expanded']
    }
});

_enums.ariaPropertiesEnum = enumCreator({
    activedescendant: {
        type: 'property',
        valueType: 'idref'
    },
    atomic: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    autocomplete: {
        defaultValue: 'none',
        type: 'property',
        valueType: 'token',
        values: [
            'inline',
            'list',
            'both',
            'none'
        ]
    },
    busy: {
        defaultValue: 'false',
        type: 'state',
        valueType: 'boolean'
    },
    checked: {
        defaultValue: 'undefined',
        type: 'state',
        valueType: 'token',
        values: [
            'true',
            'false',
            'mixed',
            'undefined'
        ]
    },
    controls: {
        type: 'property',
        valueType: 'idref_list'
    },
    describedby: {
        type: 'property',
        valueType: 'idref_list'
    },
    disabled: {
        defaultValue: 'false',
        type: 'state',
        valueType: 'boolean'
    },
    dropeffect: {
        defaultValue: 'none',
        type: 'property',
        valueType: 'token_list',
        values: 'copy move link execute popup none'.split(' ')
    },
    expanded: {
        defaultValue: 'undefined',
        type: 'state',
        valueType: 'token',
        values: [
            'true',
            'false',
            'undefined'
        ]
    },
    flowto: {
        type: 'property',
        valueType: 'idref_list'
    },
    grabbed: {
        defaultValue: 'undefined',
        type: 'state',
        valueType: 'token',
        values: [
            'true',
            'false',
            'undefined'
        ]
    },
    haspopup: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    hidden: {
        defaultValue: 'false',
        type: 'state',
        valueType: 'boolean'
    },
    invalid: {
        defaultValue: 'false',
        type: 'state',
        valueType: 'token',
        values: [
            'grammar',
            'false',
            'spelling',
            'true'
        ]
    },
    label: {
        type: 'property',
        valueType: 'string'
    },
    labelledby: {
        type: 'property',
        valueType: 'idref_list'
    },
    level: {
        type: 'property',
        valueType: 'integer'
    },
    live: {
        defaultValue: 'off',
        type: 'property',
        valueType: 'token',
        values: [
            'off',
            'polite',
            'assertive'
        ]
    },
    multiline: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    multiselectable: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    orientation: {
        defaultValue: 'vertical',
        type: 'property',
        valueType: 'token',
        values: [
            'horizontal',
            'vertical'
        ]
    },
    owns: {
        type: 'property',
        valueType: 'idref_list'
    },
    posinset: {
        type: 'property',
        valueType: 'integer'
    },
    pressed: {
        defaultValue: 'undefined',
        type: 'state',
        valueType: 'token',
        values: [
            'true',
            'false',
            'mixed',
            'undefined'
        ]
    },
    readonly: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    relevant: {
        defaultValue: 'additions text',
        type: 'property',
        valueType: 'token_list',
        values: [
            'additions',
            'removals',
            'text',
            'all'
        ]
    },
    required: {
        defaultValue: 'false',
        type: 'property',
        valueType: 'boolean'
    },
    selected: {
        defaultValue: 'undefined',
        type: 'state',
        valueType: 'token',
        values: [
            'true',
            'false',
            'undefined'
        ]
    },
    setsize: {
        type: 'property',
        valueType: 'integer'
    },
    sort: {
        defaultValue: 'none',
        type: 'property',
        valueType: 'token',
        values: [
            'ascending',
            'descending',
            'none',
            'other'
        ]
    },
    valuemax: {
        type: 'property',
        valueType: 'decimal'
    },
    valuemin: {
        type: 'property',
        valueType: 'decimal'
    },
    valuenow: {
        type: 'property',
        valueType: 'decimal'
    },
    valuetext: {
        type: 'property',
        valueType: 'string'
    }
});

_enums.InlineElementsEnum = enumCreator({
    TT: !0,
    I: !0,
    B: !0,
    BIG: !0,
    SMALL: !0,
    EM: !0,
    STRONG: !0,
    DFN: !0,
    CODE: !0,
    SAMP: !0,
    KBD: !0,
    VAR: !0,
    CITE: !0,
    ABBR: !0,
    ACRONYM: !0,
    A: !0,
    IMG: !0,
    OBJECT: !0,
    BR: !0,
    SCRIPT: !0,
    MAP: !0,
    Q: !0,
    SUB: !0,
    SUP: !0,
    SPAN: !0,
    BDO: !0,
    INPUT: !0,
    SELECT: !0,
    TEXTAREA: !0,
    LABEL: !0,
    BUTTON: !0
});

_enums.TagAndSemanticInfoEnum = enumCreator({
    A: [
        {
            role: 'link',
            allowed: 'button checkbox menuitem menuitemcheckbox menuitemradio tab treeitem'.split(' '),
            selector: 'a[href]'
        }
    ],
    ADDRESS: [
        {
            role: '',
            allowed: [
                'contentinfo',
                'presentation'
            ]
        }
    ],
    AREA: [
        {
            role: 'link',
            selector: 'area[href]'
        }
    ],
    ARTICLE: [
        {
            role: 'article',
            allowed: [
                'presentation',
                'article',
                'document',
                'application',
                'main'
            ]
        }
    ],
    ASIDE: [
        {
            role: 'complementary',
            allowed: [
                'note',
                'complementary',
                'search',
                'presentation'
            ]
        }
    ],
    AUDIO: [
        {
            role: '',
            allowed: [
                'application',
                'presentation'
            ]
        }
    ],
    BASE: [
        {
            role: '',
            reserved: !0
        }
    ],
    BODY: [
        {
            role: 'document',
            allowed: ['presentation']
        }
    ],
    BUTTON: [
        {
            role: 'button',
            allowed: [
                'link',
                'menuitem',
                'menuitemcheckbox',
                'menuitemradio',
                'radio'
            ],
            selector: 'button:not([aria-pressed]):not([type="menu"])'
        },
        {
            role: 'button',
            allowed: ['button'],
            selector: 'button[aria-pressed]'
        },
        {
            role: 'button',
            attributes: {
                'aria-haspopup': !0
            },
            allowed: [
                'link',
                'menuitem',
                'menuitemcheckbox',
                'menuitemradio',
                'radio'
            ],
            selector: 'button[type="menu"]'
        }
    ],
    CAPTION: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    COL: [
        {
            role: '',
            reserved: !0
        }
    ],
    COLGROUP: [
        {
            role: '',
            reserved: !0
        }
    ],
    DATALIST: [
        {
            role: 'listbox',
            attributes: {
                'aria-multiselectable': !1
            },
            allowed: ['presentation']
        }
    ],
    DEL: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    DD: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    DT: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    DETAILS: [
        {
            role: 'group',
            allowed: [
                'group',
                'presentation'
            ]
        }
    ],
    DIALOG: [
        {
            role: 'dialog',
            allowed: 'dialog alert alertdialog application log marquee status'.split(' '),
            selector: 'dialog[open]'
        },
        {
            role: 'dialog',
            attributes: {
                'aria-hidden': !0
            },
            allowed: 'dialog alert alertdialog application log marquee status'.split(' '),
            selector: 'dialog:not([open])'
        }
    ],
    DIV: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    DL: [
        {
            role: 'list',
            allowed: ['presentation']
        }
    ],
    EMBED: [
        {
            role: '',
            allowed: [
                'application',
                'document',
                'img',
                'presentation'
            ]
        }
    ],
    FIGURE: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    FOOTER: [
        {
            role: '',
            allowed: [
                'contentinfo',
                'presentation'
            ]
        }
    ],
    FORM: [
        {
            role: 'form',
            allowed: ['presentation']
        }
    ],
    P: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    PRE: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    BLOCKQUOTE: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    H1: [
        {
            role: 'heading'
        }
    ],
    H2: [
        {
            role: 'heading'
        }
    ],
    H3: [
        {
            role: 'heading'
        }
    ],
    H4: [
        {
            role: 'heading'
        }
    ],
    H5: [
        {
            role: 'heading'
        }
    ],
    H6: [
        {
            role: 'heading'
        }
    ],
    HEAD: [
        {
            role: '',
            reserved: !0
        }
    ],
    HEADER: [
        {
            role: '',
            allowed: [
                'banner',
                'presentation'
            ]
        }
    ],
    HR: [
        {
            role: 'separator',
            allowed: ['presentation']
        }
    ],
    HTML: [
        {
            role: '',
            reserved: !0
        }
    ],
    IFRAME: [
        {
            role: '',
            allowed: [
                'application',
                'document',
                'img',
                'presentation'
            ],
            selector: 'iframe:not([seamless])'
        },
        {
            role: '',
            allowed: [
                'application',
                'document',
                'img',
                'presentation',
                'group'
            ],
            selector: 'iframe[seamless]'
        }
    ],
    IMG: [
        {
            role: 'presentation',
            reserved: !0,
            selector: 'img[alt=""]'
        },
        {
            role: 'img',
            allowed: ['*'],
            selector: 'img[alt]:not([alt=""])'
        }
    ],
    INPUT: [
        {
            role: 'button',
            allowed: [
                'link',
                'menuitem',
                'menuitemcheckbox',
                'menuitemradio',
                'radio'
            ],
            selector: 'input[type="button"]:not([aria-pressed])'
        },
        {
            role: 'button',
            allowed: ['button'],
            selector: 'input[type="button"][aria-pressed]'
        },
        {
            role: 'checkbox',
            allowed: ['checkbox'],
            selector: 'input[type="checkbox"]'
        },
        {
            role: '',
            selector: 'input[type="color"]'
        },
        {
            role: '',
            selector: 'input[type="date"]'
        },
        {
            role: '',
            selector: 'input[type="datetime"]'
        },
        {
            role: 'textbox',
            selector: 'input[type="email"]:not([list])'
        },
        {
            role: '',
            selector: 'input[type="file"]'
        },
        {
            role: '',
            reserved: !0,
            selector: 'input[type="hidden"]'
        },
        {
            role: 'button',
            allowed: ['button'],
            selector: 'input[type="image"][aria-pressed]'
        },
        {
            role: 'button',
            allowed: [
                'link',
                'menuitem',
                'menuitemcheckbox',
                'menuitemradio',
                'radio'
            ],
            selector: 'input[type="image"]:not([aria-pressed])'
        },
        {
            role: '',
            selector: 'input[type="month"]'
        },
        {
            role: '',
            selector: 'input[type="number"]'
        },
        {
            role: 'textbox',
            selector: 'input[type="password"]'
        },
        {
            role: 'radio',
            allowed: ['menuitemradio'],
            selector: 'input[type="radio"]'
        },
        {
            role: 'slider',
            selector: 'input[type="range"]'
        },
        {
            role: 'button',
            selector: 'input[type="reset"]'
        },
        {
            role: 'combobox',
            selector: 'input[type="search"][list]'
        },
        {
            role: 'textbox',
            selector: 'input[type="search"]:not([list])'
        },
        {
            role: 'button',
            selector: 'input[type="submit"]'
        },
        {
            role: 'combobox',
            selector: 'input[type="tel"][list]'
        },
        {
            role: 'textbox',
            selector: 'input[type="tel"]:not([list])'
        },
        {
            role: 'combobox',
            selector: 'input[type="text"][list]'
        },
        {
            role: 'textbox',
            selector: 'input[type="text"]:not([list])'
        },
        {
            role: 'textbox',
            selector: 'input:not([type])'
        },
        {
            role: '',
            selector: 'input[type="time"]'
        },
        {
            role: 'combobox',
            selector: 'input[type="url"][list]'
        },
        {
            role: 'textbox',
            selector: 'input[type="url"]:not([list])'
        },
        {
            role: '',
            selector: 'input[type="week"]'
        }
    ],
    INS: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    KEYGEN: [
        {
            role: ''
        }
    ],
    LABEL: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    LI: [
        {
            role: 'listitem',
            allowed: 'menuitem menuitemcheckbox menuitemradio option tab treeitem presentation'.split(' '),
            selector: 'ol:not([role="presentation"])>li, ul:not([role="presentation"])>li'
        },
        {
            role: 'listitem',
            allowed: 'listitem menuitem menuitemcheckbox menuitemradio option tab treeitem presentation'.split(' '),
            selector: 'ol[role="presentation"]>li, ul[role="presentation"]>li'
        }
    ],
    LINK: [
        {
            role: 'link',
            reserved: !0,
            selector: 'link[href]'
        }
    ],
    MAIN: [
        {
            role: '',
            allowed: [
                'main',
                'presentation'
            ]
        }
    ],
    MAP: [
        {
            role: '',
            reserved: !0
        }
    ],
    MATH: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    MENU: [
        {
            role: 'toolbar',
            selector: 'menu[type="toolbar"]'
        }
    ],
    MENUITEM: [
        {
            role: 'menuitem',
            selector: 'menuitem[type="command"]'
        },
        {
            role: 'menuitemcheckbox',
            selector: 'menuitem[type="checkbox"]'
        },
        {
            role: 'menuitemradio',
            selector: 'menuitem[type="radio"]'
        }
    ],
    META: [
        {
            role: '',
            reserved: !0
        }
    ],
    METER: [
        {
            role: 'progressbar',
            allowed: ['presentation']
        }
    ],
    NAV: [
        {
            role: 'navigation',
            allowed: [
                'navigation',
                'presentation'
            ]
        }
    ],
    NOSCRIPT: [
        {
            role: '',
            reserved: !0
        }
    ],
    OBJECT: [
        {
            role: '',
            allowed: [
                'application',
                'document',
                'img',
                'presentation'
            ]
        }
    ],
    OL: [
        {
            role: 'list',
            allowed: 'directory group listbox menu menubar tablist toolbar tree presentation'.split(' ')
        }
    ],
    OPTGROUP: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    OPTION: [
        {
            role: 'option'
        }
    ],
    OUTPUT: [
        {
            role: 'status',
            allowed: ['*']
        }
    ],
    PARAM: [
        {
            role: '',
            reserved: !0
        }
    ],
    PICTURE: [
        {
            role: '',
            reserved: !0
        }
    ],
    PROGRESS: [
        {
            role: 'progressbar',
            allowed: ['presentation']
        }
    ],
    SCRIPT: [
        {
            role: '',
            reserved: !0
        }
    ],
    SECTION: [
        {
            role: 'region',
            allowed: 'alert alertdialog application contentinfo dialog document log marquee search status presentation'.split(
                ' ')
        }
    ],
    SELECT: [
        {
            role: 'listbox'
        }
    ],
    SOURCE: [
        {
            role: '',
            reserved: !0
        }
    ],
    SPAN: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    STYLE: [
        {
            role: '',
            reserved: !0
        }
    ],
    SVG: [
        {
            role: '',
            allowed: [
                'application',
                'document',
                'img',
                'presentation'
            ]
        }
    ],
    SUMMARY: [
        {
            role: '',
            allowed: ['presentation']
        }
    ],
    TABLE: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    TEMPLATE: [
        {
            role: '',
            reserved: !0
        }
    ],
    TEXTAREA: [
        {
            role: 'textbox'
        }
    ],
    TBODY: [
        {
            role: 'rowgroup',
            allowed: ['*']
        }
    ],
    THEAD: [
        {
            role: 'rowgroup',
            allowed: ['*']
        }
    ],
    TFOOT: [
        {
            role: 'rowgroup',
            allowed: ['*']
        }
    ],
    TITLE: [
        {
            role: '',
            reserved: !0
        }
    ],
    TD: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    TH: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    TR: [
        {
            role: '',
            allowed: ['*']
        }
    ],
    TRACK: [
        {
            role: '',
            reserved: !0
        }
    ],
    UL: [
        {
            role: 'list',
            allowed: 'directory group listbox menu menubar tablist toolbar tree presentation'.split(' ')
        }
    ],
    VIDEO: [
        {
            role: '',
            allowed: [
                'application',
                'presentation'
            ]
        }
    ]
});

module.exports = _enums;
