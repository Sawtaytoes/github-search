import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

import GitHubSearchResults from './GitHubSearchResults'
import User from './User'

const SEARCH_USERS = gql`
	query SearchUsers(
		$after: String,
		$before: String,
		$searchQuery: String!,
	) {
		search(
			after: $after,
			before: $before,
			first: 10,
			query: $searchQuery,
			type: USER,
		) {
			edges {
				node {
					... on User {
						avatarUrl
						bioHTML
						databaseId
						followers {
							totalCount
						}
						following {
							totalCount
						}
						login
						name
						starredRepositories {
							totalCount
						}
						url
						websiteUrl
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
			userCount
		}
	}
`

const propTypes = {
	searchQuery: PropTypes.string,
}

const GitHubUserSearch = ({
	searchQuery,
}) => (
	searchQuery
	? (
		<Query
			fetchPolicy="cache-and-data"
			query={SEARCH_USERS}
			variables={{ searchQuery }}
		>
			{({
				data,
				fetchMore,
				loading: isLoading,
			}) => (
				isLoading
				? 'Loading...'
				: (
					<GitHubSearchResults
						component={User}
						data={data}
						fetchMore={fetchMore}
						idName="databaseId"
					/>
				)
			)}
		</Query>
	)
	: (
		<div>
			Search GitHub Users
		</div>
	)
)

GitHubUserSearch
.propTypes = propTypes

export default GitHubUserSearch
