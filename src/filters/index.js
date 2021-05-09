import { parseTime } from '@/utils'
export const formatDate = function(time) {
  return parseTime(new Date(time))
}
