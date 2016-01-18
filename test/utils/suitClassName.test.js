import test from 'blue-tape'
import R from 'ramda'
import suitClassName from '../../src/utils/suitClassName'

test('suitClassName()', t => {
  ;[
    {
      args: ['ComponentName', 'descendent', ['modifier'], { states: true }],
      expected: 'ComponentName-descendent ComponentName-descendent--modifier is-states',
    },
    {
      args: ['AwesomeComponent', 'heading', [], { blinking: false }],
      expected: 'AwesomeComponent-heading',
    },
    {
      args: ['AwesomeComponent', 'footer', ['darker'], { blinking: true }],
      expected: 'AwesomeComponent-footer AwesomeComponent-footer--darker is-blinking',
    },
    {
      args: ['MenuBar', null, ['lighter'], { blinking: true, visible: true }],
      expected: 'MenuBar MenuBar--lighter is-blinking is-visible',
    },
    {
      args: ['Selector', 'text', [], { hoverable: true, highlighted: false }],
      expected: 'Selector-text is-hoverable',
    },
    {
      args: ['Car', 'roof', ['shiny', 'large'], { opened: true }],
      expected: 'Car-roof Car-roof--shiny Car-roof--large is-opened',
    },
    {
      args: ['Selector'],
      expected: 'Selector',
    },
  ].forEach(({args, expected}) => {
    t.equal(R.apply(suitClassName, args), expected, 'returns ' + expected)
  })

  t.end()
})
