import { resolve } from 'path'
import { loadJsonFile } from 'load-json-file'

const dirname = import.meta.dirname

const source = await loadJsonFile(resolve(dirname, './data/source.json'))
const ags2ars = await loadJsonFile(resolve(dirname, './data/ags2ars.json'))

const output = source.map(s => {
  const { MunicipalityCode } = s
  if (!MunicipalityCode) return s
  if (+MunicipalityCode === 0) return s
  const matchingArs = ags2ars[MunicipalityCode]
  if (!matchingArs) {
    console.error(`no ars found for municipality code: ${MunicipalityCode}`)
    return s
  }
  return {
    ...s,
    arsPadded: matchingArs.padEnd(12, '0')
  }
})

process.stdout.write(JSON.stringify(output, null, 2))
