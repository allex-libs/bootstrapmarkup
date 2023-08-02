function createFormMarkups (lib, o, m, mylib) {
  'use strict';

  var appendStringTo = lib.joinStringsWith;

  function rowBreakMarkup (options) {
    return o(m.div, 'CLASS', 'w-100');
  }
  mylib.rowBreakMarkup = rowBreakMarkup;

  mylib.inputWithFloatingLabel = function (options) {
    var id = 'ID'+lib.uid();
    options = options || {};
    options.input = options.input || {};
    options.label = options.label || {};
    return  o(m.div,
      'CLASS', appendStringTo('form-floating', options.class, ' '),
      'ATTRS', options.attrs || '',
      'CONTENTS', [
        o(m[options.input.type]
          , 'CLASS', appendStringTo('form-control', options.input.class, ' ')
          , 'ATTRS', appendStringTo('id="'+id+'" placeholder="'+options.caption+'"', options.input.attrs, ' ')
        ),
        o(m.label
          , 'CLASS', appendStringTo('floatinglabel', options.label.class, ' ')
          , 'ATTRS', appendStringTo('for="'+id+'"', options.label.attrs, ' ')
          , 'CONTENTS', options.caption
        )
      ]
    );
  };

  function inputGroupText (options) {
    options = options || {};
    return o(m.span,
      'CLASS', 'input-group-text' + (options.class ? ' '+options.class : ''),
      'ATTRS', options.attrs || '',
      'CONTENTS', options.caption || ''
    );
  }
  mylib.inputGroupText = inputGroupText;


  mylib.inputGroup2 = function inputGroup2 (options) {
    options = options || {};
    return  o(m.div,
      'CLASS', appendStringTo('input-group', options.class, ' '),
      'ATTRS', options.attrs || '',
      'CONTENTS', [
        inputGroupText({caption: options.caption, class: appendStringTo('inputgroup2-caption', options.captionclass, ' '), attrs: options.captionattrs||''}),
        options.fieldmarkup
      ]
    );
  };

  mylib.inputGroupOf = function inputGroupOf (options) {
    return o(m.div,
      'CLASS', appendStringTo('input-group', options.class, ' '),
      'CONTENTS', Array.prototype.slice.call(arguments, 1)
    );
  }

  function ulGroupLier (liobj) {
    if (lib.isString(liobj.text)) {
      return o(m.li,
        'CONTENTS', o(m.a,
          'CLASS', appendStringTo('dropdown-item', liobj.class, ' '),
          'ATTRS', appendStringTo('', liobj.attrs, ' '),
          'CONTENTS', liobj.text
        )
      );
    }
    if (liobj.markup) {
      return o(m.li,
        'CLASS', 'dropdown-item',
        'CONTENTS', liobj.markup
      );
    }
  }

  function ulGroup (obj) {
    return o(m.ul,
      'CLASS', appendStringTo('', obj.class, ' '),
      'ATTRS', appendStringTo('', obj.attrs, ' '),
      'CONTENTS', (obj.lis || []).map(ulGroupLier)
    );
  }
  mylib.ulGroup = ulGroup;

  mylib.dropDown = function dropDown (obj) {
    var id = lib.uid();
    return o(m.div,
      'CLASS', appendStringTo('dropdown', obj.inputgroupclass, ' '),
      'ATTRS', obj.inputgroupattrs || '',
      'CONTENTS', [
        o(m[obj.buttontype],
          'CLASS', appendStringTo('dropdown-toggle', obj.buttonclass, ' '),
          'ATTRS', appendStringTo(
            'id="'+id+'" data-bs-toggle="dropdown" aria-expanded="false"',
            obj.buttonattrs,
            ' '),
          'CONTENTS', obj.buttontext
        ),
        ulGroup ({
          class: appendStringTo('dropdown-menu', obj.dropdownclass, ' '),
          attrs: appendStringTo('aria-labelledby="'+id+'"', obj.dropdownattrs, ' '),
          lis: obj.contents
        })
      ]
    );
  };

  mylib.dropDownButton = function dropDownButton (obj) {
    obj.buttontype = 'button';
    obj.buttonclass = appendStringTo(obj.buttonclass, 'btn btn-primary', ' ');
    obj.buttonattrs = appendStringTo(obj.buttonattrs, 'type="button"', ' ');
    return mylib.dropDown(
      obj
    );
  };

  mylib.collapseButton = function collapseButton (obj) {
    var id = 'ID'+lib.uid(), buttonmarkup, panemarkup;
    obj = obj || {};
    obj.collapse = obj.collapse || {};
    buttonmarkup = o(m.button,
      'CLASS', appendStringTo('btn btn-primary', obj.buttonclass, ' '),
      'ATTRS', appendStringTo(
        'type="button" data-bs-toggle="collapse" data-bs-target="#'+id+'" aria-expanded="false"',
        obj.buttonattrs,
        ' '),
      'CONTENTS', obj.buttontext
    );
    panemarkup = o(m.div,
      'CLASS', appendStringTo('collapse', obj.collapse.class, ' '),
      'ATTRS', 'id="'+id+'"',
      'CONTENTS', obj.pane //(obj.contents || []).map(ulGroupLier)
    );
    if (!obj.split) {
      return o(m.div,
        'CLASS', appendStringTo('', obj.class, ' '),
        'CONTENTS', [
          buttonmarkup,
          panemarkup
        ]
      );
    }
    return {
      button: buttonmarkup,
      pane: panemarkup
    };
  }

  mylib.offCanvasButton = function offCanvasButton (obj) {
    var id = "ID"+lib.uid(), labelid="ID"+lib.uid(), buttonmarkup, panemarkup;
    obj = obj || {};
    obj.offcanvas = obj.offcanvas || {};
    obj.offcanvas.orientation = obj.offcanvas.orientation || 'start';
    buttonmarkup = o(m.button,
      'CLASS', appendStringTo('btn btn-primary', obj.buttonclass, ' '),
      'ATTRS', appendStringTo(
        'type="button" data-bs-toggle="offcanvas" data-bs-target="#'+id+'" aria-controls="'+id+'"',
        obj.buttonattrs,
        ' '),
      'CONTENTS', obj.buttontext
    );
    panemarkup = o(m.div,
      'CLASS', appendStringTo('offcanvas '+'offcanvas-'+obj.offcanvas.orientation, obj.offcanvas.class, ' '),
      'ATTRS', appendStringTo('id="'+id+'" aria-labelledby="'+labelid+'"', obj.offcanvas.attrs, ' '),
      'CONTENTS', [
        o(m.div,
          'CLASS', 'offcanvas-header',
          'ATTRS', '',
          'CONTENTS', [
            o(m.h5,
              'CLASS', 'offcanvas-title',
              'ATTRS', 'id="'+labelid+'"',
              'CONTENTS', obj.offcanvas.title || 'Title'
            ),
            o(m.button,
              'CLASS', 'btn-close text-reset', 
              'ATTRS', 'type="button" data-bs-dismiss="offcanvas" aria-label="Close"'
            )
          ]
        ),
        o(m.div,
          'CLASS', 'offcanvas-body',
          'CONTENTS', obj.pane
        )        
      ] 
    );
    if (!obj.split) {
      return o(m.div,
        'CLASS', appendStringTo('', obj.class, ' '),
        'CONTENTS', [
          buttonmarkup,
          panemarkup
        ]
      );
    }
    return {
      button: buttonmarkup,
      pane: panemarkup
    };
  }

  function switchGroupElementer (switchelement) {
    var id;
    if (switchelement.label) {
      id = lib.uid();
      return [
        o(m.checkboxinput,
          'CLASS', appendStringTo('form-check-input', switchelement.class, ' '),
          'ATTRS', appendStringTo('id="'+id+'"', switchelement.attrs, ' ')
        ),
        o(m.label,
          'CLASS', appendStringTo('form-check-label', switchelement.label.class, ' '),
          'ATTRS', appendStringTo('for="'+id+'"', switchelement.label.attrs, ' '),
          'CONTENTS', switchelement.label.contents
        )
      ];
    }
    return [
      o(m.checkboxinput,
        'CLASS', appendStringTo('form-check-input', switchelement.class, ' '),
        'ATTRS', appendStringTo('', switchelement.attrs, ' ')
      )
    ];
  }
  function switchGroup (obj) {
    return o(m.div,
      'CLASS', appendStringTo('form-check form-switch', obj.class, ' '),
      'CONTENTS', (obj.contents || []).map(switchGroupElementer)
    );
  }

  mylib.groupBox = function (options) {
    options = options || {};
    return o(m.div
      , 'CLASS', lib.joinStringsWith('groupbox d-flex flex-column', options.class, ' ')
      , 'ATTRS', options.attrs || ''
      , 'CONTENTS', [
        o(m.span
          , 'CLASS', 'groupboxcaption .text-nowrap'
          , 'ATTRS', 'style="white-space:nowrap;"'
          , 'CONTENTS', options.caption
        ),
        o(m.div
          , 'CLASS', 'groupboxcontents w-100 h-100'
          , 'CONTENTS', options.contents
        )
      ]
    );
  };

  mylib.produceCheckbox = function(options) {
    var elementtypename, elementname, caption, captionelementname;
    options = options || {};
    elementtypename = options.elementtypename || '';
    elementname = options.elementname || '';
    caption = options.caption || '';
    captionelementname = options.captionelementname || '';
    return o(m.div,
      'CLASS', lib.joinStringsWith('form-check', options.class, ' '),
      'ATTRS', options.attrs || '',
      'CONTENTS', [
        o(m.checkboxinput,
          'CLASS', 'form-check-input',
          'ATTRS', elementtypename+'="'+elementname+'"'
        ),
        o(m.label,
          'CLASS', 'form-check-label',
          'ATTRS', captionelementname ? elementtypename+'="'+captionelementname+'"' : '',
          'CONTENTS', caption,
        )
      ]
    )
  };

}
module.exports = createFormMarkups;