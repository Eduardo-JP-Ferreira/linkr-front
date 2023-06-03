import styled from "styled-components";
import Header from "../../components/Header";
import TrendingList from "../../components/TrendingList";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth.context";
import tagsServices from "../../services/tagsServices";
import { ThreeDots } from "react-loader-spinner";
import PostCard from "./components/PostCard";

export default function HashtagPage() {
  const { auth } = useContext(AuthContext);
  const { hashtag } = useParams();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (auth) {
      setPostList([]);
      tagsServices
        .getTagPostList(auth.token, hashtag)
        .then(({ data }) => {
          setPostList(data);
        })
        .catch((err) => {
          alert(`Error ${err.response.status}: ${err.response.data}`);
        });
    }
  }, [hashtag]);

  return (
    <>
      <Header />
      <PageStyle>
        <Wrapper>
          <h2 data-test="hashtag-title"># {hashtag}</h2>
          <ContentContainer>
            <Listing>
              {!postList.length && (
                <LoadingStyle>
                  Loading
                  <ThreeDots height={6} width={18} color="white" />
                </LoadingStyle>
              )}
              {postList.map((p) => (
                <PostCard key={p.id} item={p} />
              ))}
            </Listing>
            <TrendingList />
          </ContentContainer>
        </Wrapper>
      </PageStyle>
    </>
  );
}

const PageStyle = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-bottom: 80px;
  a {
    text-decoration: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 25px;
`;

const Listing = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  li {
    width: 611px;
    min-height: 276px;
    height: 276px;
    max-height: 276px;
    background: #171717;
    border-radius: 16px;
    display: flex;
    gap: 19px;
    padding: 18px;
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 41px;
  h2 {
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    margin-top: 53px;
    color: #ffffff;
    width: 100%;
  }
`;

const LoadingStyle = styled.div`
  display: flex;
  gap: 2px;
  width: 611px;
  justify-content: center;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  div {
    margin-bottom: 1px;
  }
  svg {
    align-self: end;
    justify-self: end;
  }
`;
