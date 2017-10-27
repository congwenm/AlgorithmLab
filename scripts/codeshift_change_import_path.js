// jscodeshift --extensions=js -t scripts/codeshift_change_import_path.js ./src --ignore-pattern="util.js"

// 1. replace import path with local path
// 2. replace util methods with `util.method` syntax
const ILLEGAL_IMPORT_REGEX = /(?=..\/)*src\/.*\/(.*)/
const recognizedMethods = [
  'expand',
  'every',
  'sampleWithCache',
  'sample',
  'ordered',
  'reverse_order',
  'padding',
  'max_by',
  'shuffle',
  'ascendingVerifier',
  'descendingVerifier',
]

export default (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source)

  root.find(j.ImportDeclaration).map(path => {
    const val = path.node.source.value
    const match = ILLEGAL_IMPORT_REGEX.exec(val)
    if (match) {
      const filename = match[1]

      root.find(j.Literal, { value: val })
        .replaceWith(
          j.literal(`./${filename}`)
        );
    }
  })

  let foundFile = false;
  recognizedMethods.forEach(meth => {
    foundFile = foundFile || !!root.find(j.Identifier, { name: meth }).length
    root.find(j.Identifier, { name: meth })
      .replaceWith(j.memberExpression(
        j.identifier('util'),
        j.identifier(meth)
      ))
  })

  if (foundFile) {
    root.find(j.Declaration)
      .at(0)
      .insertBefore(
        j.importDeclaration(
          [j.importDefaultSpecifier(
            j.identifier('util')
          )],
          j.literal('util')
        )
      )
  }
  return root.toSource();
}
