import { Link, useNavigate } from "react-router-dom";

import { getBoardArticles, moveBoardToBasket } from "../../../api/board/boardAPI";
import { useEffect, useState } from "react";

export default function AnnouncementBoard(){

    const [articles, setArticles] = useState([]); // 게시글 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [selectedArticles, setSelectedArticles] = useState([]);
    const navigate = useNavigate();

     // 체크박스 선택/해제 핸들러
     const handleCheckboxChange = (articleId) => {
        setSelectedArticles((prevSelected) =>
            prevSelected.includes(articleId)
                ? prevSelected.filter((id) => id !== articleId) // 이미 선택된 경우 제거
                : [...prevSelected, articleId] // 선택되지 않은 경우 추가
        );
    };

    // 전체 선택/해제 핸들러
    const handleSelectAll = () => {
        if (selectedArticles.length === articles.length) {
            setSelectedArticles([]); // 모두 선택되어 있으면 선택 해제
        } else {
            setSelectedArticles(articles.map((article) => article.id)); // 모두 선택
        }
    };

    const handleDelete = async () => {
        if (selectedArticles.length === 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }

        if (!window.confirm("선택한 게시글을 삭제하시겠습니까?")) {
            return;
        }

        try {
            // 선택된 게시글 삭제
            await Promise.all(selectedArticles.map((id) => moveBoardToBasket(id)));
            // 삭제된 게시글을 화면에서 제거
            setArticles((prevArticles) =>
                prevArticles.filter((article) => !selectedArticles.includes(article.id))
            );
            setSelectedArticles([]); // 선택 초기화
            alert("선택한 게시글이 삭제되었습니다.");
        } catch (err) {
            console.error("게시글 삭제 중 오류:", err);
            alert("게시글 삭제에 실패했습니다.");
        }
    };


    useEffect(() => {
        // 데이터 가져오기
        const fetchArticles = async () => {
            try {
                const data = await getBoardArticles(); // API 호출
                setArticles(data); // 상태에 데이터 저장
            } catch (err) {
                setError(err.message); // 에러 상태 저장
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    

    return(
        <div className="boardContentDiv" id="boardContentDiv">
            <div className="g_search">
                <h2 className="blind">홈 서비스 통합 검색</h2>
                <div className="srch_box">
                    <div className="inp_box">
                        <label htmlFor="basicKeyword" className="blind">
                            <i>검색어</i>
                        </label>
                        <input id="basicKeyword" type="text" autoComplete="off" placeholder="게시글 검색"/>
                        <button type="button" className="btn_search">
                            <span className="blind">검색</span>
                        </button>
                        <button type="button" className="board_detail">
                            상세
                        </button>
                    </div>
                    <p className="status_message" style={{display: "none"}}>내 게시글에 자동 저장되었습니다. null</p>
                    <strong className="search_result" style={{display: "none"}}>검색 결과
                        <em className="count">0</em>
                    </strong>
                    <div className="ly_autocomplete" style={{display: "none"}}>
                        <ul style={{display: "none"}}>
                            <li style={{display: "none"}}>
                                <span className="empty">검색어 저장 기능이 꺼져있습니다.</span>
                            </li> 
                            <li>
                                <span className="empty">최근 검색어가 없습니다.</span>
                            </li>
                        </ul> 
                        <div className="save_keyword">
                            <button type="button" className="reset" style={{display: "none"}}>
                            전체 삭제
                            </button> 
                            <button type="button">
                            검색어저장 끄기
                            </button> 
                            <button type="button" style={{display: "none"}}>
                            검색어저장 켜기
                            </button>
                        </div>
                    </div>
                </div>
                <div className="srch_detail">
                    <h3 className="blind"></h3>
                    <div className="fm_keyword">
                        <div className="box_col1">
                            <strong className="tit">게시판</strong>
                            <div className="select_box board">
                                <button type="button" className="selected">
                                    <strong>전체 게시판</strong>
                                </button>
                                <div className="option_box" style={{zindex: 200}}>
                                    <ul>
                                        <li className="">
                                            <button type="button">
                                             전체 게시판
                                            </button>
                                        </li> 
                                        <li className="line"></li>
                                        <li>
                                            <span>그린컴퓨터아카데미</span>
                                        </li> 
                                        <li className="depth">
                                            <button type="button">
                                             공지사항
                                            </button>
                                        </li> 
                                        <li className="depth">
                                            <button type="button">
                                            업무 매뉴얼
                                            </button>
                                        </li>
                                        <li className="depth">
                                            <button type="button">
                                            자유게시판
                                            </button>
                                        </li>
                                        <li className="line"></li> 
                                        <li className="">
                                            <button type="button">
                                            휴지통
                                            </button>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box_col2">
                            <strong className="tit">내용</strong>
                            <div className="select_box show">
                                <button type="button" className="selected">
                                    <strong>전체</strong>
                                </button>
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="sel"> 전체 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 제목+본문 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 제목 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 본문 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 첨부 파일 </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <label htmlFor="detailKeyword" className="blind">입력</label>
                            <input id="detailKeyword" type="text" autoComplete="off" className="cont"/>  
                        </div>
                        <span className="break"></span>
                        <div className="box_col1">
                            <strong className="tit">작성자</strong>
                             <div className="has_ly">
                                <label htmlFor="srch_writer" className="blind">입력</label> 
                                <input id="srch_writer" type="text" autoComplete="off"/> 
                                <div className="ly_slct_member" style={{display: "none"}}>
                                    <ul>
                                  
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box_col2 _searchPeriod">
                            <strong className="tit">기간</strong>
                            <div className="select_box">        
                                <button type="button" className="selected">
                                    <strong>직접입력</strong>
                                </button>
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="">
                                            전체
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1주
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            3개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            6개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1년
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="sel">
                                            직접입력
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                                <label htmlFor="srch_date_start" className="blind">시작 날짜</label>
                                <input id="srch_date_start" type="text" autoComplete="off" className="date-picker-input"/>
                                <span className="dash">-</span>
                                <label htmlFor="srch_date_finish" className="blind">종료 날짜</label>
                                <input id="srch_date_finish" type="text" autoComplete="off" className="date-picker-input">
                                </input>
                        </div>
                    </div>
                    <div className="fm">
                        <p>
                            <input id="chk_attfile" type="checkbox"/>
                            <label htmlFor="chk_attfile">첨부 파일 있음</label>
                        </p>
                        <p>
                            <input id="chk_comment" type="checkbox"/>
                            <label htmlFor="chk_comment">댓글 포함</label>
                        </p>
                        <button type="button" className="submit_detail">
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="articleList">
                <div className="cont_head edit_type">
                    <div className="info_area">
                        <h2 className="board_title">
                            <span className="text">공지사항</span> 
                            <span role="switch" tabIndex="0" className="toggle_favorite">
                                <span className="blind">즐겨찾기</span>
                            </span>
                        </h2>
                    </div>
                    <div className="task_area">
                        <div className="btn_box">
                            <span className="chk_board">
                                <input id="chk_all" 
                                       type="checkbox" 
                                       name="chk_all"  
                                       checked={selectedArticles.length === articles.length}
                                        onChange={handleSelectAll}
                                />
                                <label htmlFor="chk_all">전체 선택</label>
                            </span>
                            <button type="button" disabled={selectedArticles.length === 0} className="point">
                                <strong>읽음</strong>
                            </button>
                            <div className="chk_del">
                                <button type="button" disabled={selectedArticles.length === 0} className="point" onClick={handleDelete}>
                                    <strong>삭제</strong>
                                </button>
                            </div>
                            <div className="chk_move">
                                <button type="button" disabled={selectedArticles.length === 0}>
                                    이동
                                    <em className="bu"></em>
                                </button>
                            </div>
                        </div>
                        <div className="h_util">
                            <div className="notification">
                                <strong className="title">새글 알림</strong> 
                                <button type="button" role="switch" aria-checked="true" className="button_switch">
                                    <span className="blind">새글 알림</span>
                                </button>
                            </div>
                            <div className="select_box" style={{display: "none"}}>
                                <button type="button" className="selected">
                                    <strong>글 등록순</strong>
                                </button> 
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="sel">
                                            글 등록순
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            글/댓글 업데이트순
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="select_box">
                                <button type="button" className="selected">
                                    <strong>전체</strong>
                                </button>
    
                            </div>
                            <div className="select_box">
                                <button type="button" className="selected">
                                    <strong>20개씩 보기</strong>
                                </button>
    
                            </div>
                        </div>
                       
                    </div>
                   
                </div>
                <div className="board_list">
                    <ul className="list edit_type default">
                    {articles
                     .filter((article) => article.status !== "trash")
                    .map((article) => {
                        console.log(article); // 각 article 객체의 값을 콘솔에 출력
                        return (
                            <li
                            key={article.id}
                            className="read has_photo"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/article/view/${article.id}`)} // li 클릭 시 이동
                        >
                             <p className="chk">
                            <input
                                id={`check_${article.id}`}
                                type="checkbox"
                                name="chk_bd"
                                checked={selectedArticles.includes(article.id)}
                                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                                onChange={() => handleCheckboxChange(article.id)} // 상태 변경
                            />
                           <label
                                htmlFor={`check_${article.id}`}
                                onClick={(e) => e.stopPropagation()} // label 클릭 시 부모 이벤트 방지
                            >
                                해당 게시글 선택
                            </label>
                        </p>
                            <div className="sbj_box">
                                <p className="sbj">
                                    <em className="ic_noti">필독</em>
                                    <Link to={`/article/view/${article.id}`} onClick={(e) => e.stopPropagation()}>
                                        {article.title}
                                    </Link>
                                </p>
                            </div>
                            <p className="infor">
                                <button type="button" className="user">
                                      {article.author?.username || "Unknown User"}
                                </button>
                                <span className="read_chk">
                                    읽음 <strong>{article.readCount || 0}</strong>
                                </span>
                            </p>
                            <p className="date">
                                {new Date(article.createdAt).toLocaleDateString("en-CA")}
                            </p>
                        </li>
                        );
                    })}
                    </ul>
                    <p className="bt_more">
                        <button type="button" className="btn" onClick={() =>
                            (window.location.href =
                            "/app/noticeboard")
                        }>
                            글쓰기
                        </button>
                    </p>
                </div>

            </div>            
    
            </div>
    );
}