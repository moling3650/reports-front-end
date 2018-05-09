import createRoutes from '@/lib/createRoutes'

describe('createRoutes.js', () => {
  const routes = createRoutes([
    'A',
    {
      name: 'B',
      children: [
        {
          name: 'C',
          path: '/Cat',
          children: ['D']
        }
      ]
    }
  ])

  it('create path correct', () => {
    expect(routes[0].path).toEqual('/A')
    expect(routes[1].children[0].path).toEqual('/B/Cat')
    expect(routes[1].children[0].children[0].path).toEqual('/B/Cat/D')
  })

  it('throws', () => {
    expect(() => createRoutes('')).toThrow()
    expect(() => createRoutes([''])).toThrow()
  })
})
