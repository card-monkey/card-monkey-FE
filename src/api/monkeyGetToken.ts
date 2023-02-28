import axios from "axios";
import instance from "./apiController";

class MonkeyGetToken {
  instance;

  constructor() {
    this.instance = instance;
  }

  /** 로그아웃 */
  async signOut() {
    return this.instance
      .post("/logout")
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  /**신청한 카드 내역 */
  async cardList() {
    return this.instance
      .get(`/info/apply`)
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }

  /**인기 top3카드 */
  async hot3() {
    return this.instance
      .get("/card/rank")
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }

  /**관심혜택 맞춤 카드 */
  async benefitCard() {
    return this.instance
      .get(`/card/recommend`)
      .then((result) => result.data)
      .catch((error) => error);
  }

  /**카드명으로 검색 */
  async searchByName(name: string) {
    return this.instance
      .get(`/card/name?search=${name}`)
      .then((result) => result.data.content)
      .catch((error) => error);
  }

  //**카드회사명으로 검색 */
  async searchByCompany(company: string) {
    return this.instance
      .get(`/card/company?search=${company}`)
      .then((result) => result.data.content)
      .catch((error) => error);
  }

  //**카드혜택으로 검색 */
  async searchByBenefit(benefit: string) {
    return this.instance
      .get(`/card/benefit?search=${benefit}`)
      .then((result) => result.data.content)
      .catch((error) => error);
  }

  /**전체카드 조회 */
  async allCard() {
    return this.instance
      .get(`/card`)
      .then((result) => result.data)
      .catch((error) => error);
  }

  /**카드 상세정보 조회 */
  async cardDetail(id: string | undefined) {
    return this.instance
      .get(`/card/${id}`)
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }

  /**카드 신청 */
  async cardApplication(id: number) {
    return this.instance
      .post(`/card/apply/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => console.log(result.data))
      .catch((error) => {
        console.log(error);
      });
  }

  /**리뷰 조회(이모저모) */
  async getReview(id: number) {
    return this.instance
      .get(`/card/review/${id}`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**리뷰 선택(이모저모) */
  async selectReview(id: number, message: string[]) {
    return this.instance
      .post(`/card/review/${id}`, { id: id, message: message })
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  }

  /**비밀번호 변경 */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    return this.instance
      .patch(`/info/changePassword`, {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }

  /**회원 탈퇴 */
  async withdrawal() {
    return this.instance
      .delete(`/info/deleteAccount`)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**나의 관심상품 */
  async myFavor() {
    return this.instance
      .get(`/info/favor`)
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }

  /**신청한 카드 취소*/
  async deleteCard(id: number) {
    return this.instance
      .delete(`/card/apply/${id}`)
      .then((result) => result.data)
      .catch((error) => {
        console.log("카드 취소 에러", error);
      });
  }

  /**찜하기 or 찜하기 취소 */
  async toggleFavor(id: number) {
    return this.instance
      .post(`/card/favor/${id}`)
      .then((result) => result.data)
      .catch((error) => {
        return "에러";
      });
  }

  /**관심혜택 변경 */
  async changeBenefit(benefit: string[]) {
    return this.instance
      .patch(`/info/changeBenefit`, { benefit: benefit })
      .then((result) => console.log(result.data))
      .catch((error) => {
        return "에러";
      });
  }
}

const getTokenApi = new MonkeyGetToken();

export default getTokenApi;
