import axios from '../axios'

const defaultPath = '/adm/business/v1/'
const business = {
   // 사업정보 목록 조회
   getBusinessList() {
      return axios.get(defaultPath + 'listBusinessInfo.do')
   },

   // 사업정보 상세 조회
   getBusinessDetail(bizSn) {
      return axios.get(defaultPath + 'selectBusinessInfo.do?bizSn=' + bizSn)
   },

   // 사업정보 등록
   createBusiness(params) {
      return axios.post(defaultPath + 'createBusinessInfo.do', params)
   },

   // 사업 정보 수정
   updateBusiness(params) {
      return axios.post(defaultPath + 'updateBusinessInfo.do', params)
   },

   // 사업 모집 상태 변경
   updateRcritPsbltyYn(params) {
      return axios.post(defaultPath + 'updateRcritPsbltyYn.do', params)
   },

   // 특별모집 코드 목록 조회
   getSpecialRecruitCodeList() {
      return axios.get(defaultPath + 'listSpecialRecruitCodeForCommon.do')
   },

   // 특별모집 코드 페이징 목록 조회
   getSpecialRecruitCodePagingList(params) {
      return axios.get(defaultPath + 'listSpecialRecruitCode.do', params)
   },

   // 특별모집 코드 등록
   createSpecialRecruitCode(params) {
      return axios.post(defaultPath + 'createSpecialRecruitCode.do', params)
   },

   // 특별모집 코드 삭제
   deleteSpecialRecruitCode(params) {
      return axios.post(defaultPath + 'deleteSpecialRecruitCode.do', params)
   },

   // 특별모집 목록 조회
   getSpecialRecruitList(params) {
      return axios.get(defaultPath + 'listSpecialRecruitInfo.do', params)
   },

   // 특별모집 상세 조회
   getSpecialRecruitDetail(spclRcritSn) {
      return axios.get(defaultPath + 'selectSpecialRecruitInfo.do?spclRcritSn=' + spclRcritSn)
   },

   // 특별모집 상태 변경
   updateSpecialRcritPsbltyYn(params) {
      return axios.post(defaultPath + 'updateSpecialRcritPsbltyYn.do', params)
   },

   // 특별모집 등록
   createSpecialRecruit(params) {
      return axios.post(defaultPath + 'createSpecialRecruitInfo.do', params)
   },

   // 특별모집 수정
   updateSpecialRecruit(params) {
      return axios.post(defaultPath + 'updateSpecialRecruitInfo.do', params)
   },

   // 특별모집 삭제
   deleteSpecialRecruit(params) {
      return axios.post(defaultPath + 'deleteSpecialRecruitInfo.do', params)
   },

   // 사업신청 정보
   getBusinessApply(params) {
      return axios.get(defaultPath + 'selectApply.do', params)
   },

   // 사업참가 자격 정보
   getBusinessQualification(params) {
      return axios.get(defaultPath + 'selectSeoulResidenceProof.do', params)
   },

   // 사업 참가 증빙 방법
   getBusinessProofMethod(bizSn) {
      return axios.get(defaultPath + 'listSeoulRsdcCdForCommon.do?bizSn=' + bizSn)
   },

   // 사업참가자격 상태 저장
   confirmBusinessProof(params) {
      return axios.post(defaultPath + 'confirmSeoulResidenceProof.do', params)
   },

   // 밴드 목록 조회
   getBandList(params) {
      return axios.post(defaultPath + 'listBandForCommon.do', params)
   },

   // 회원정보 목록 조회
   getMemberList(params) {
      return axios.post(defaultPath + 'listSpplSmbndMngMember.do', params)
   },

   // 전체 밴드 배송 현황 조회
   getBandDeliveryStatus(bizSn) {
      return axios.get(defaultPath + 'selectBandDeliveryStatus.do?bizSn=' + bizSn)
   },

   // 회원 기기 배송정보 조회
   getMemberBandDeliveryInfo(unqId) {
      return axios.get(defaultPath + 'selectBandDeliveryInfo.do?unqId=' + unqId)
   },

   // 회원 기기 배송정보 수정
   updateMemberBandDelivery(params) {
      return axios.post(defaultPath + 'updateBandDeliveryInfo.do', params)
   },

   // 밴드 발송 처리
   confirmSmbndShipment(params) {
      return axios.post(defaultPath + 'confirmSmbndShipment.do', params)
   },

   //밴드 반송 신청 확인
   confirmSmbndSendBackApply(params) {
      return axios.post(defaultPath + 'confirmSmbndSendBackApply.do', params)
   },

   // 밴드 반송 수령 확인
   confirmSmbndSendBack(params) {
      return axios.post(defaultPath + 'confirmSmbndSendBack.do', params)
   },

   // 밴드 처리 이력 목록 조회
   getBandDeliveryHistoryList(params) {
      return axios.get(defaultPath + 'listSmbndHistory.do', params)
   },

   // 전체 밴드 반납 현황 조회
   getBandReturnStatus(bizSn) {
      return axios.get(defaultPath + 'selectBandReturnStatus.do?bizSn=' + bizSn)
   },

   // 회원 기기 반납정보 조회
   getMemberBandReturnInfo(unqId) {
      return axios.get(defaultPath + 'selectBandReturnInfo.do?unqId=' + unqId)
   },

   // 회원 기기 반납정보 저장
   updateMemberBandReturn(params) {
      return axios.post(defaultPath + 'updateBandReturnInfo.do', params)
   },
}

export default { business }
