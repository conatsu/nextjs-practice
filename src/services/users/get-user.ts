import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number
}

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  /**
   * ユーザーAPI
   * サンプルレスポンス
   * {
   *  "id": "1",
   *  "username": "taketo",
   *  "displayName": "Taketo Yoshida",
   *  "email": "taketo@sample.com",
   *  "profileImageUrl": "/users/1.png",
   *  "description": "sample"
   * }
   */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    },
  )
}

export default getUser
