import { get, set } from 'idb-keyval'

interface FileContent {
  content: string
}

interface Folder {
  items: Record<string, FileSystemItem>
}

type FileSystemItem = FileContent | Folder | (FileContent & Folder)

export class VFS {
  #root: Folder = { items: {} }

  constructor() {
    // this.#root = {
    //   items: {
    //     a: {
    //       content: '我是a文件',
    //       items: {}
    //     },
    //     b: {
    //       items: {
    //         c: {
    //           content: '我是b文件夹里的c文件'
    //         },
    //         d: {
    //           content: '我是d文件，但是还有一个名字是d的文件夹',
    //           items: {
    //             e: {
    //               content: '我是d文件夹里的e文件'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    this.loadFromDisk()
  }

  isFile = (item: FileSystemItem): item is FileContent => 'content' in item
  isFolder = (item: FileSystemItem): item is Folder => 'items' in item

  setFile(path: string, content: string) {
    const pathArr = path.split('/').filter((v) => v)
    if (!pathArr || pathArr.length <= 0) throw new Error('Invalid path')

    const fileName = pathArr.pop() as string
    let current: FileSystemItem = this.#root
    let segment

    for (segment of pathArr) {
      if (!this.isFolder(current)) throw new Error(`path ${segment} not exists`)
      current = current.items[segment]
    }

    ;(current as Folder).items = {
      ...((current as Folder)?.items ?? {}),
      [fileName]: { content }
    }

    this.saveToDisk()

    return true
  }

  getFile(path: string) {
    const pathArr = path.split('/').filter((v) => v)
    if (!pathArr || pathArr.length <= 0) throw new Error('Invalid path')

    let current: FileSystemItem = this.#root
    let segment

    for (segment of pathArr) {
      if (!this.isFolder(current)) throw new Error(`path ${segment} is not a folder`)
      current = current.items[segment]
    }

    if (!current) throw new Error(`file ${segment} is not exists`)
    if (this.isFolder(current)) throw new Error(`${segment} is not a file`)

    return current.content
  }

  setFolder(path: string) {
    const pathArr = path.split('/').filter((v) => v)
    if (!pathArr || pathArr.length <= 0) throw new Error('Invalid path')

    let current: FileSystemItem = this.#root
    for (const segment of pathArr) {
      if (this.isFolder(current)) {
        if (!current.items[segment]) {
          current.items = {
            ...current.items,
            [segment]: { items: {} }
          }
        }
      } else {
        ;(current as Folder | (Folder & FileContent)).items = { [segment]: { items: {} } }
      }

      current = (current as Folder | (Folder & FileContent)).items[segment]
    }

    this.saveToDisk()

    return true
  }

  getFolder(path: string) {
    const pathArr = path.split('/').filter((v) => v)
    if ((!pathArr || pathArr.length <= 0) && path !== '/') throw new Error('Invalid path')

    let fullPath = ''
    let current: FileSystemItem = this.#root
    let segment

    for (segment of pathArr) {
      if (!this.isFolder(current)) throw new Error(`path ${segment} is not a folder`)
      current = current.items[segment]
      fullPath += `/${segment}`
    }

    if (!current) throw new Error(`folder ${segment} is not exists`)
    if (!this.isFolder(current)) throw new Error(`${segment} is not a folder`)

    return Object.keys(current.items).map((key) => {
      return {
        name: key,
        fullPath: fullPath + `/${key}`,
        isFile: this.isFile(current.items[key]),
        isFolder: this.isFolder(current.items[key])
      }
    })
  }

  async saveToDisk() {
    await set('database', this.#root)
  }

  async loadFromDisk() {
    this.#root = (await get('database')) ?? { items: {} }
  }
}
