import test from 'blue-tape'
import { apply } from 'ramda'
import className from '../../src/utils/className'

test('className()', t => {
  const tests = [
    {
      args: ['ComponentName', ['descendants'], ['modifier'], { states: true }],
      expected: 'ComponentName-descendants ComponentName-descendants--modifier is-states',
    },
    {
      args: ['AwesomeComponent', ['heading'], [], { blinking: false }],
      expected: 'AwesomeComponent-heading',
    },
    {
      args: ['AwesomeComponent', ['footer'], ['darker'], { blinking: true }],
      expected: 'AwesomeComponent-footer AwesomeComponent-footer--darker is-blinking',
    },
    {
      args: ['MenuBar', [], ['lighter'], { blinking: true, visible: true }],
      expected: 'MenuBar MenuBar--lighter is-blinking is-visible',
    },
    {
      args: ['Selector', ['heading', 'text'], [], { hoverable: true, highlighted: false }],
      expected: 'Selector-heading-text is-hoverable',
    },
    {
      args: ['Car', ['roof'], ['shiny', 'large'], { opened: true }],
      expected: 'Car-roof Car-roof--shiny Car-roof--large is-opened',
    },
    {
      args: ['Selector', [], [], {}],
      expected: 'Selector',
    },
  ]

  tests.forEach(({args, expected}) =>
      t.equal(apply(className, args), expected, 'returns ' + expected)
  )

  t.end()
})
