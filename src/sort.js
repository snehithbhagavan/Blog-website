export default function Sort(){
    return(
        <>
        <select name="sort" id="sort">
             <option value="likes">Sort by Number of Likes</option>
             <option value="comments">Sort by Number of Comments</option>
        </select>

        <select name="order" id="order">
            <option value="asc">Ascending order</option>
            <option value="desc">Descending order</option>
        </select>
        </>
      )
}