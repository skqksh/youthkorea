<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex>
        <v-divider></v-divider>

        <v-card>
          <v-card-title>
            <h2> 1.
              <v-btn class="primary" to="/admin/setting/menu">메뉴 설정</v-btn> 에서 메뉴를 생성 하세요.
            </h2>
          </v-card-title>
          <v-card-text>
            <ul>
              <li>
                <p> 메뉴타입</p>
                <ul>
                  <li><b>페이지 : </b>하나의 페이지화면을 보여줍니다. '게시판' 이 있습니다.</li>
                  <li><b>게시판 : </b>여러개의 글을 등록할 수 있습니다.</li>
                  <li><b>단순메뉴 : </b>하위메뉴를 가지기 위한 메뉴 입니다. 즉,하위메뉴가 있다면, 단순메뉴로 설정하는것이 자연스러워요</li>
                </ul>
                <br>
              </li>
              <li>
                <p> [게시판], [오시는길], [소개 > 인사말, 연혁] 과 같은 메뉴를 만들어 보시면 어떨까요?</p>
              </li>
              <li>
                <p>
                  <b>메뉴수정</b> : 생성된 메뉴정보를 수정합니다. </p>
              </li>
              <li>
                <p>
                  <b>하위메뉴 추가</b> : 생성된 메뉴의 하위메뉴를 추가합니다. 최대 3단계까지 추가 가능 합니다.</p>
              </li>
              <li>
                <p>
                  <b>메뉴 제거</b> : 생성된 메뉴를 제거합니다. 하위메뉴가 있는경우 제거할 수 없습니다.</p>
                <p style="color:red"> 메뉴 제거시, 해당 메뉴에 해당하는 글 또한 삭제되므로 주의를 요합니다.</p>
              </li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <h2> 2.
              <v-btn class="primary" to="/admin/setting/category">카테고리 설정</v-btn> 에서 카테고리를 생성 하세요.</h2>
          </v-card-title>
          <v-card-actions>
            <ul>
              <li>
                <p> 카테고리는 '게시판' 타입의 메뉴에서, 게시글을 구분할 수 있도록 합니다.</p>
              </li>
               <li>
                <p> [봄],[여름],[가을],[겨울] 과 같은 카테고리를 만들어 보면 어떨까요?</p>
              </li>
            </ul>
          </v-card-actions>
        </v-card>

        <v-card>
          <v-card-title>
            <h2> 3.
              <v-btn class="primary" to="/admin/new-post">게시판관리 > 새글작성</v-btn> 에서 새 게시글을 작성 해 보세요</h2>
          </v-card-title>
          <v-card-actions>
            <p></p>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth']
}
</script>

<style scoped>
</style>
