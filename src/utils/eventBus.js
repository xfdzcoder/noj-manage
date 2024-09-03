import mitt from 'mitt'

export const emitter = mitt()

export const EventType = {
  REFRESH_TABLE: 'refresh-table'
}
