import fs from 'fs'

export class FileSystemUtils {
    private static fileName = 'public/emails/emails.txt'
    private static emails: string[] = []
    private static readError: Error | null = null

    private static async readTxtFile() {
        return new Promise<void>((resolve, reject) => {
            fs.readFile(this.fileName, 'utf8', (err, data) => {
                if (err) {
                    console.error('Erro ao ler o arquivo:', err)
                    this.readError = err
                    reject(err)
                    return
                }

                const lines = data.split('\n')

                lines.forEach((linha) => {
                    const email = linha.trim()
                    if (email !== '') {
                        this.emails.push(email)
                    }
                })

                resolve()
            })
        })
    }

    public static async getReadResult() {
        if (this.emails.length === 0 && !this.readError) {
            try {
                await this.readTxtFile()
            } catch (error) {
                throw error
            }
        }

        if (this.readError) {
            throw this.readError
        }

        return this.emails
    }
}