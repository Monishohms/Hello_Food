 - This is Namaste React 
 /**
 * Header
 *  -logo component
 *  - NAV items like home , about, cart etc...
 * Body
 *  - search
 *  - card-container
 *      - name of rest, delevery time, cuisine, star rating
 * Footer
 *  - copyrights
 *  - some links
 *  restaurant info etc... 
 */

 React keeps the sync between data layer and UI layer so that if any changes made then it re-render the component automatically.
 React is doing efficient DOM manipulation so that's why react is so fast.-------this is core concept of react.
 In React we have best rendering machanisms.


 .filter-btn{
    padding: 10px;
    margin: 10px;
    background-color: rgba(228, 218, 226, 0.6);
    cursor: pointer;
}
.filter-btn:hover{
    border: 1px solid black;
    cursor:pointer;
    
}








 <ul>
                {resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards?.length}
                <h4>Bob</h4>
                {
                    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards?.map((item)=>{
                        <div>

                        <h4>Bob</h4>
                        <h4>{item}</h4>
                        </div>

                    })
                }
                {resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards?.map((item)=>{
                   return ( <li id="item?.card?.info?.id">
                        {item?.card?.info?.name}
                    </li> )                   
               } )}                     
            </ul>