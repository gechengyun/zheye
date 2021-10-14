import { ColumnProps, ImageProps, UserProps } from './store'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}
interface CheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function beforeUploadCheck (file:File, condotion: CheckCondition) {
  const { format, size } = condotion
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

// interface TestProps {
//   _id: string;
//   name: string
// }

// const testData: TestProps [] = [{ _id: '1', name: 'a' }, { _id: '2', name: 'b' }]
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const arrToObj = <T extends {_id?: string}>(arr:Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const objToArr = <T>(obj: {[key: string]: T}) => {
  return Object.keys(obj).map(key => obj[key])
}
